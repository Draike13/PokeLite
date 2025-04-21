Setup Intructions:
--download zip from GitHub
--open in editor
--run CLI command 'npm install'
--run command 'ng s' on PokeLite directory
\*\*Alternatively, access game at Http://PokeLite-2025.web.app

Project Overview:
--PokeLite is a game project combining classic text adventure, roguelite elements, and Pokemon!
--Start the game by entering your trainer name. You'll be givin a handful of pokemon to use at the start. There are always more to unlock if you know where to look.
--Travel Kanto to challenge gym leaders(bosses) and collect badges. What will happen if you collect them all?

Demonstration:
--Create: Starting the game will give you save files to select. Doing so will allow you to create a save file with your name. Saved to local Storage.
--Read: Anytime you select any already created save file, it is read and loaded into the active state, allowing changes to it to be made, and playing of the game on that file.
--Update: If you start a run and gain experience or level up with a pokemon, it will be saved live to local storage, updating your save filel automatically. \*\*This will happen on any perminent gain to the file; leveling, experience gain, badge aquisition, unlocking a new pokemon or gym leader path...etc...
Delete: If you select the menu and go to settings, the only current setting is to select a file to delete. Clicking the file deletes the selected save data.

Easter Eggs?!
--There are many easter eggs in the game, for unlocking pokemon, or special modes...problems? Hunt them down!

--Alpha version developed by Draike

Reflections:
--This app is built almost entirely on reactive signals. Nearly everything that runs is doing so not be directly calling a function, but because something else happened in the game and it triggers an effect to notice that change and alter the game state in some way.
--this was incredibly challenging, but also allowed to be create standard flows like the combat effect, and allow for interuptions to that standard flow whenever other things were happening, without having to completely change the original formula everytime a feature was added.
--effect is a monster for reactive design, and the more I used it, the more i kept seeing you could do with it. Simple things like triggering effects with small boolean signal flags, down to creating a reusable flag schema to turn on and off effects as i needed.
--it can get very complicated. But the posibilities are amazing.
