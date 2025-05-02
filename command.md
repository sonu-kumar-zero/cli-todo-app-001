# important commands to create .exe file
- npx esbuild index.js --bundle --platform=node --target=node18 --outfile=bundle.js
- pkg bundle.js --targets node18-win-x64 --output todo-app.exe