"""Independent standard-library oracles. No third-party Python packages required."""
import collections
import itertools
import json
import math
import os
import pathlib
import random
import subprocess

ROOT = pathlib.Path(__file__).resolve().parents[1]
requests, expected = [], []


def add(request, result):
    requests.append(request)
    expected.append(result)


def feedback(secret, guess):
    exact = sum(a == b for a, b in zip(secret, guess))
    remaining_s = [a for a, b in zip(secret, guess) if a != b]
    remaining_g = [b for a, b in zip(secret, guess) if a != b]
    a, b = collections.Counter(remaining_s), collections.Counter(remaining_g)
    return dict(exact=exact, misplaced=sum((a & b).values()))


small = list(itertools.product(range(3), repeat=3))
for secret in small:
    for guess in small:
        add(dict(op='feedback', secret=secret, guess=guess, rules=dict(length=3, colors=3)), feedback(secret, guess))
rng = random.Random(2026)
for _ in range(1000):
    secret = [rng.randrange(6) for _ in range(4)]
    guess = [rng.randrange(6) for _ in range(4)]
    add(dict(op='feedback', secret=secret, guess=guess), feedback(secret, guess))


def word_feedback(secret, guess):
    # Independently reserve matching positions, then remove one available index per yellow.
    marks = [2 if a == b else 0 for a, b in zip(secret, guess)]
    available = [i for i in range(len(secret)) if marks[i] != 2]
    for i, char in enumerate(guess):
        if marks[i] == 2:
            continue
        found = next((j for j in available if secret[j] == char), None)
        if found is not None:
            marks[i] = 1
            available.remove(found)
    return marks


words = [''.join(w) for w in itertools.product('ABC', repeat=4)]
for secret in words:
    for guess in words:
        add(dict(op='word', secret=secret, guess=guess), word_feedback(secret, guess))


def mapped(value, fn):
    result = []
    index = 0
    for char in value:
        if char.upper() in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' and len(char) == 1 and char.isascii():
            out = chr(65 + fn(ord(char.upper()) - 65, index) % 26)
            result.append(out.lower() if char.islower() else out)
            index += 1
        else:
            result.append(char)
    return ''.join(result)


value = 'The River, at 07:30! Zebra xylophone.'
for shift in range(26):
    for decrypt in [False, True]:
        add(dict(op='cipher', kind='caesar', value=value, options=dict(shift=shift, decrypt=decrypt)), mapped(value, lambda x, i: x + (-shift if decrypt else shift)))
for a in range(26):
    if math.gcd(a, 26) != 1:
        continue
    for b in range(26):
        add(dict(op='cipher', kind='affine', value=value, options=dict(a=a, b=b)), mapped(value, lambda x, i: a*x+b))
for key in ['A', 'LEMON', 'RIVER', 'XYZ']:
    ks = [ord(c)-65 for c in key]
    for variant in ['vigenere', 'beaufort', 'variant-beaufort']:
        for decrypt in [False, True]:
            def poly(x, i):
                k = ks[i % len(ks)]
                if variant == 'beaufort':
                    return k-x
                if variant == 'variant-beaufort':
                    return x+(k if decrypt else -k)
                return x+(-k if decrypt else k)
            add(dict(op='cipher', kind=variant, value=value, options=dict(key=key, decrypt=decrypt)), mapped(value, poly))


for width in range(2, 7):
    for length in range(0, 24):
        original = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[:length]
        order = list(range(width))
        rng.shuffle(order)
        # Read columns from a row representation, independently of JS indexing.
        rows = [original[i:i+width] for i in range(0, length, width)]
        encrypted = ''.join(row[column] for column in order for row in rows if column < len(row))
        add(dict(op='cipher', kind='columnar', value=original, options=dict(order=order)), encrypted)
        add(dict(op='cipher', kind='columnar', value=encrypted, options=dict(order=order, decrypt=True)), original)


for _ in range(50):
    value = ''.join(rng.choice('ABCDE !123') for _ in range(rng.randint(2, 200)))
    clean = [x for x in value if x in 'ABCDE']
    counts = [clean.count(chr(65+i)) for i in range(26)]
    n = len(clean)
    ic = sum(a == b for i, a in enumerate(clean) for j, b in enumerate(clean) if i != j) / (n*(n-1)) if n > 1 else 0
    entropy = -sum((c/n)*math.log2(c/n) for c in counts if c) if n else 0
    add(dict(op='analysis', value=value), dict(ic=ic, entropy=entropy, counts=counts))


for strategy in ['minimax', 'entropy', 'expected']:
    codes = list(itertools.product(range(3), repeat=2))
    ids = [0, 2, 3, 5, 8]
    rows = []
    for g, guess in enumerate(codes):
        branches = collections.Counter(tuple(feedback(codes[i], guess).values()) for i in ids)
        counts = list(branches.values())
        entropy = -sum(c/len(ids)*math.log2(c/len(ids)) for c in counts)
        expected_size = sum(c*c for c in counts)/len(ids)
        metric = max(counts) if strategy == 'minimax' else -entropy if strategy == 'entropy' else expected_size
        rows.append((metric, g not in ids, g))
    rows.sort()
    add(dict(op='rank', rules=dict(length=2, colors=3), ids=ids, options=dict(strategy=strategy, limit=9)), [r[2] for r in rows])


completed = subprocess.run([os.environ.get('NODE_BINARY', 'node'), str(ROOT/'validation'/'bridge.mjs')], input=json.dumps(requests), text=True, capture_output=True, check=True, cwd=ROOT)
actual = json.loads(completed.stdout)
assert len(actual) == len(expected)
for index, (request, a, b) in enumerate(zip(requests, actual, expected)):
    if request['op'] == 'analysis':
        assert a['counts'] == b['counts'], (index, request)
        assert math.isclose(a['ic'], b['ic'], abs_tol=1e-12), (index, request)
        assert math.isclose(a['entropy'], b['entropy'], abs_tol=1e-12), (index, request)
    elif request['op'] == 'rank':
        assert [r['id'] for r in a['rows']] == b, (index, a, b)
        assert a['exactGlobal'] is True
    else:
        assert a == b, (index, request, a, b)
print(json.dumps(dict(status='passed', cases=len(expected), families=dict(collections.Counter(r['op'] for r in requests))), indent=2))
