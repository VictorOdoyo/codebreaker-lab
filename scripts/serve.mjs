import {createServer} from '../src/server.js';
const port=Number(process.env.PORT??4179),server=createServer();server.listen(port,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:'+server.address().port));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{server.closeAllConnections();server.close(()=>process.exit(0));});
