killall -9 node
watchman watch-del-all  
rm -rf $TMPDIR/react-*
rm -rf node_modules/ 
rm -rf package-lock.json
npm cache clean --force 
yarn cache clean
npm install
npm start -- --reset-cache