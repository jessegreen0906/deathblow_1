<h1>Feature List</h1>

<ol>
    <li>ClientApp makes request to Server to init Session
        <ul>
            <li><s>Starting from (UI)StartScreen</s></li>
            <li><s>Server returns sessionID</s></li>
            <li><s>Client stores sessionID</s></li>
            <li><s>End on (UI)CharacterCreation</s></li>
        </ul>
    </li>
    <li>
       Player who starts game is added to the game.
       <ul>
        <li><s>When player creates a new game, server creates a new game 
        object</s></li>
        <li><s>When new game object is created, creating player is added
        .</s></li>
        <li><s>Game object is stored on the server</s></li>
       </ul>
    </li>
    <li><s>Unique gameID is generated for each game</s></li>
    <li><s>User can create character</s></li>
    <li><s>User can join an existing game</s></li>
    <li><s>User can customise the stats of their character</s></li>
    <li>Game engine calculates each step and final result 
    of the game based on pre-defined rules.
       <ul>
        <li><s>Game checks that there are at least 2 live characters</s></li>
        <li><s>Game gives initial placement to characters</s></li>
        <li>Game decides what each character will do.</li>
       </ul>
    </li>
</ol>