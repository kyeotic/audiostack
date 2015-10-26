App Goals
===

Components

* Track Importer
	* File Input
	* localForage Output (buffer as base64)
* Track List
	* Show localForage-stored songs
	* Allow user to Load songs (decode buffer into audio source)
* Track Deck (Possibly Merge With List)
	* Show loaded songs (audio source)
	* Create new slices
* Slice Deck
	* Show Slices
	* Allow re-arranging
	* Play slices
* Audio Slice
	* Holds audio source
	* expose audio controls
	* Allow modifications


Actions

* Track Importer
	* Select Song File
	* Read Song (Start Async)
	* Receive Song (Finish Async)
	* Recive Song Error (Error Async)
* Track List
	* Delete Track
	* Load (Decode) Track (Start Async)
	* Recieve Load Track (Finish Async)
* Track Deck
	* Delete Track
	* Create Slice
* Slice Deck
	* Move Slice
	* Delete Slice
	* Play Deck
	* Stop Deck
	* Pause Deck
* Audio Slice
	* Play Slice