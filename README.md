**A simple bible verse preview extension**
<P align="center">
  <Video src="https://github.com/user-attachments/assets/81245112-484e-4aae-90bd-d294996a4d14"></Video>
  <Video src="https://github.com/user-attachments/assets/fcd584b3-d82a-4679-b919-d81fe668179c"></Video>
</P>

Steps to build
1. Pull the repository and install packages.
  ```sh
  git pull https://github.com/bushieman/Bible-Verse-Extension.git
  pnpm i
  ```

2. In the src/Components/BibleVerse.jsx, replace the api key with your specific key from https://scripture.api.bible/ and change the bible id from https://docs.api.bible/guides/bibles to your preferred translation. 
  ![img](public/BibleVerse.jsx.png)

3. Finally run the following commands. For firefox, make sure to `npm run build:firefox`
  ```sh
  npm run build
  npm run zip
  ```

4. Now all you need to do is extract the generated zip file in /dist and load unpacked the extracted folder in chrome extensions.
   
5. For tweaks, run `npm run dev` and make changes then repeat steps 3 and 4.
