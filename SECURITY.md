# Security and data handling

The workbench is a local educational application. It sends no messages or sessions to an external service. Runtime assets have no CDN dependencies. Cipher transforms are historical methods and should not protect sensitive information.

The local server binds to loopback, accepts GET/HEAD, restricts asset extensions and directories, and validates canonical paths before reading. It is a development/inspection server, not a hosted authentication or multi-tenant service. If deploying elsewhere, the host is responsible for transport security and audience controls.

Imported sessions are size-bounded, versioned, copied, and replayed before acceptance. Browser work runs in a terminable worker. UI text uses DOM text nodes, and a restrictive content policy blocks inline scripts and framing. CSV exports escape fields and neutralize leading formula triggers. JSON reports can include your original message and key hypotheses; treat exported files according to their content.

To report a vulnerability, use the repository's GitHub security reporting feature if available. Otherwise open an issue describing the affected component and impact without including private messages, credentials, or a working exploit against another person. Include the release version, relevant settings, and a minimal local reproduction.
