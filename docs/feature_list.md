<h1>Feature List</h1>

<ol>
    <li>ClientApp makes request to Server to init Session
        <ul>
            <li>Starting from (UI)StartScreen</li>
            <li>Server returns sessionID</li>
            <li>Client stores sessionID</li>
            <li>End on (UI)CharacterCreation</li>
        </ul>
    </li>
    <li>
       Player who starts game is added to the game.
       <ul>
        <li>When player creates a new game, server creates a new game 
        object</li>
        <li>When new game object is created, creating player is added.</li>
        <li>Game object is stored on the server</li>
       </ul>
    </li>
    <li>Unique gameID is generated for each game</li>
</ol>