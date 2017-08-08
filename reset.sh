killall -9 node
watchman watch-del-all  
rm -rf $TMPDIR/react-*
rm -rf node_modules/ 
rm -rf package-lock.json
rm -rf yarn.lock
npm cache clean --force 
yarn cache clean
yarn install
npm start -- --reset-cache