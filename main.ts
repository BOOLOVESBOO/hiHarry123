function SpaceAboveThisLocationIsBlocked (CheckCol: number, CheckRow: number) {
    CheckLocation = tiles.getTileLocation(CheckCol, CheckRow).getNeighboringLocation(CollisionDirection.Top)
    CheckLocation = WrapPieceAroundTopAndBottom(CheckLocation.column, CheckLocation.row)
    return !(tiles.tileAtLocationEquals(tiles.getTileLocation(CheckLocation.column, CheckLocation.row), assets.tile`transparency16`))
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(GameIsRunning)) {
        PlayGameTone(6)
    } else {
        MovePuzzlePieceUp()
    }
})
function SpaceLeftOfThisLocationIsBlocked (CheckCol: number, CheckRow: number) {
    CheckLocation = tiles.getTileLocation(CheckCol, CheckRow).getNeighboringLocation(CollisionDirection.Left)
    if (CheckLocation.column <= BoardLeft) {
        return true
    }
    return !(tiles.tileAtLocationEquals(tiles.getTileLocation(CheckLocation.column, CheckLocation.row), assets.tile`transparency16`))
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    RotatePuzzlePiece(false)
})
function GetLocationForSecondPuzzlePiece () {
    if (PuzzleIsUpDown) {
        SecondPieceLocation = tiles.getTileLocation(PuzzleX, PuzzleY).getNeighboringLocation(CollisionDirection.Bottom)
        SecondPieceLocation = WrapPieceAroundTopAndBottom(SecondPieceLocation.column, SecondPieceLocation.row)
    } else {
        SecondPieceLocation = tiles.getTileLocation(PuzzleX, PuzzleY).getNeighboringLocation(CollisionDirection.Right)
    }
}
function WrapPieceAroundTopAndBottom (WrapCol: number, WrapRow: number) {
    if (WrapRow > BoardBottom) {
        return tiles.getTileLocation(WrapCol, BoardTop)
    } else if (WrapRow < BoardTop) {
        return tiles.getTileLocation(WrapCol, BoardBottom)
    } else {
        return tiles.getTileLocation(WrapCol, WrapRow)
    }
}
function MovePuzzlePieceDown () {
    if (!(GameIsRunning) || MakingBoardChanges) {
        return
    }
    ErasePuzzlePiece()
    if (SpaceBelowThisLocationIsBlocked(PuzzleX, PuzzleY)) {
        DrawPuzzlePiece()
        return
    }
    GetLocationForSecondPuzzlePiece()
    if (SpaceBelowThisLocationIsBlocked(SecondPieceLocation.column, SecondPieceLocation.row)) {
        DrawPuzzlePiece()
        return
    }
    if (PuzzleY >= BoardBottom) {
        PuzzleY = BoardTop
    } else {
        PuzzleY += 1
    }
    DrawPuzzlePiece()
    PlayGameTone(6)
}
function MakeBoardChanges () {
    if (BoardChangeStage == 0) {
        ComboMultiplier = 2
        if (EasyMode) {
            ReplaceBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`)
        } else {
            ReplaceBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`)
            if (BoardChanges > 0) {
                PlayGameTone(7)
            }
        }
    } else if (BoardChangeStage == 1) {
        if (EasyMode) {
            ReplaceBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`)
            if (BoardChanges > 0) {
                PlayGameTone(7)
            }
        } else {
            ReplaceBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`)
        }
    } else if (BoardChangeStage == 2) {
        TransformBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`, assets.tile`transparency16`, assets.tile`transparency16`)
        ScoreBoardChanges("Grow!", 1)
    } else if (BoardChangeStage == 3) {
        ReplaceBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`)
    } else if (BoardChangeStage == 4) {
        TransformBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`, assets.tile`transparency16`, assets.tile`transparency16`)
        ScoreBoardChanges("Munch!", 2)
    } else if (BoardChangeStage == 5) {
        ReplaceBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`)
        ReplaceBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`)
    } else if (BoardChangeStage == 6) {
        ReplaceBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`)
    } else if (BoardChangeStage == 7) {
        FillAllEmptySpaces()
    } else if (BoardChangeStage == 8) {
        TransformBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`, assets.tile`transparency16`, assets.tile`transparency16`)
        ScoreBoardChanges("Chomp!", 3)
    } else if (BoardChangeStage == 9) {
        ReplaceBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`)
        ReplaceBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`)
        ReplaceBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`)
    } else if (BoardChangeStage == 10) {
        ReplaceBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`)
    } else if (BoardChangeStage == 11) {
        if (EasyMode) {
            ReplaceBoardPieces(assets.tile`transparency16`, assets.tile`transparency16`)
        }
        FillAllEmptySpaces()
    } else {
        BoardChangeStage = 0
        MakingBoardChanges = false
        if (!(DropSoundAlreadyPlayed)) {
            PlayGameTone(4)
        }
        CheckForGameOver()
        if (TutorialMode) {
            CheckTutorialUpdate()
        } else {
            CheckForLevelUp()
        }
        MakeNewPuzzlePiece()
        DrawPuzzlePiece()
        return
    }
    BoardChangeStage += 1
    if (BoardChanges == 0 && MakingBoardChanges) {
        MakeBoardChanges()
    }
}
function FillAllEmptySpaces () {
    BoardChanges = 0
    for (let y2 = 0; y2 <= BoardBottom - BoardTop; y2++) {
        CurrentTransformRow = y2 + BoardTop
        FillEmptySpaceInRow(CurrentTransformRow)
    }
    if (BoardChanges > 0) {
        PlayGameTone(4)
    }
}
function CheckForLevelUp () {
    if (PiecesRemainUntilNextLevel <= 0) {
        if (Level < MaximumLevel) {
            effects.confetti.startScreenEffect(500)
            music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
            StepsPerPuzzlePieceDrop += -1
            Level += 1
            LevelTextSprite.setText("LEVEL " + Level)
            HiddenPlayer.sayText("LEVEL UP!", 2000, false)
        }
        PiecesRemainUntilNextLevel = PiecesScoredPerLevelUp
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(GameIsRunning)) {
        PlayGameTone(7)
    } else {
        RotatePuzzlePiece(true)
    }
})
function CheckForGameOver () {
    for (let y4 = 0; y4 <= BoardBottom - BoardTop; y4++) {
        Row = y4 + BoardTop
        if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(BoardRight, Row), assets.tile`transparency16`))) {
            game.setGameOverMessage(true, "GAME OVER")
            game.setGameOverEffect(true, effects.melt)
            game.setGameOverPlayable(true, music.melodyPlayable(music.wawawawaa), false)
            game.gameOver(true)
        }
    }
}
function ShowMainMenu () {
    Level = 1
    EasyMode = true
    TutorialMode = false
    PiecesScoredPerLevelUp = 36
    BaseScorePerPiece = 5
    MainMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("How to Play"),
    miniMenu.createMenuItem("Eco easy"),
    miniMenu.createMenuItem("Endangered ")
    )
    MainMenu.setFrame(assets.image`MenuFrame`)
    MainMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Alignment, 1)
    MainMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 8)
    MainMenu.setDimensions(scene.screenWidth() - 50, 46)
    MainMenu.setPosition(25, 70)
    MainMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        MainMenu.close()
        if (selection == "In danger") {
            EasyMode = false
            BaseScorePerPiece = 10
            ChooseTimeTrialSettings()
        }
        if (selection == "LEARN TO PLAY ") {
            TutorialMode = true
            PiecesRemainUntilNextLevel = PiecesScoredPerLevelUp
            SetupNewGame()
            HiddenPlayer.sayText("Dirt grow plants")
        } else {
            ChooseTimeTrialSettings()
        }
    })
}
function GetDinoTile (TileNumber: number) {
    if (TileNumber == 0) {
        return assets.tile`transparency16`
    } else if (TileNumber == 1) {
        return assets.tile`transparency16`
    } else if (TileNumber == 2) {
        return assets.tile`transparency16`
    } else if (TileNumber == 3) {
        return assets.tile`transparency16`
    } else {
        return assets.tile`transparency16`
    }
}
info.onCountdownEnd(function () {
    game.setGameOverMessage(true, "Best Ecosystem ever")
    game.gameOver(true)
})
function SpaceBelowThisLocationIsBlocked (CheckCol: number, CheckRow: number) {
    CheckLocation = tiles.getTileLocation(CheckCol, CheckRow).getNeighboringLocation(CollisionDirection.Bottom)
    CheckLocation = WrapPieceAroundTopAndBottom(CheckLocation.column, CheckLocation.row)
    return !(tiles.tileAtLocationEquals(tiles.getTileLocation(CheckLocation.column, CheckLocation.row), assets.tile`transparency16`))
}
function FillEmptySpaceInRow (Row: number) {
    for (let x2 = 0; x2 <= BoardRight - BoardLeft; x2++) {
        Column = BoardLeft + x2
        if (RowIsEmptyPastStartColumn(Column, Row)) {
            break;
        }
        while (tiles.tileAtLocationEquals(tiles.getTileLocation(Column, Row), assets.tile`transparency16`)) {
            FillEmptySpacesInRowFromStartColumn(Column, Row)
            BoardChanges += 1
        }
    }
}
function SetupNewGame () {
    music.play(music.stringPlayable("F E C G F G A G ", 360), music.PlaybackMode.InBackground)
    sprites.destroy(TitleText)
    info.setScore(0)
    game.setGameOverScoringType(game.ScoringType.HighScore)
    scene.setBackgroundImage(assets.image`BoardBackground`)
    if (TutorialMode) {
        tiles.setCurrentTilemap(tilemap`TutorialBoard`)
    } else {
        tiles.setCurrentTilemap(tilemap`EmptyBoard`)
    }
    scene.centerCameraAt(scene.screenWidth() / 2 + 8, scene.screenHeight() / 2 + 8)
    HiddenPlayer.setPosition(scene.screenWidth() / 2, scene.cameraProperty(CameraProperty.Bottom))
    StepsPerPuzzlePieceDrop = 12 - Level
    PiecesRemainUntilNextLevel = PiecesScoredPerLevelUp * Level
    MakeNewPuzzlePiece()
    DrawPuzzlePiece()
    PuzzleSpawnPause = 0
    GameIsRunning = true
    LevelTextSprite = textsprite.create("LEVEL " + Level, 1, 3)
    LevelTextSprite.setBorder(1, 3)
    LevelTextSprite.setPosition(29, 12)
    if (TimeTrialMode) {
        info.startCountdown(180)
        SpawnPauseTime = 200
    }
}
function ReplaceBoardPieces (Target: Image, Replacement: Image) {
    BoardChanges = 0
    for (let TransformTile of tiles.getTilesByType(Target)) {
        tiles.setTileAt(tiles.getTileLocation(TransformTile.column, TransformTile.row), Replacement)
        BoardChanges += 1
    }
}
function CheckTutorialUpdate () {
    TransformTile = tiles.getTilesByType(GetDinoTile(TutorialStage))
    if (TutorialStage == 3) {
        TransformTile = tiles.getTilesByType(assets.tile`transparency16`)
    }
    if (TransformTile.length == 0) {
        TutorialStage += 1
        if (TutorialStage == 1) {
            HiddenPlayer.sayText("Steggies eat plants")
        } else if (TutorialStage == 2) {
            HiddenPlayer.sayText("T-Rex eat steggies")
        } else if (TutorialStage == 3) {
            HiddenPlayer.sayText("T-Rex decomposes")
        } else {
            HiddenPlayer.sayText("Press A or B to spin!", 2000, false)
            TutorialMode = false
        }
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(GameIsRunning)) {
        PlayGameTone(6)
    } else {
        MovePuzzlePieceDown()
    }
})
function PlayGameTone (Tone: number) {
    if (Tone == 1) {
        music.play(music.createSoundEffect(WaveShape.Square, 200, 1264, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        DropSoundAlreadyPlayed = true
    } else if (Tone == 2) {
        music.play(music.createSoundEffect(WaveShape.Noise, 3474, 1691, 87, 0, 200, SoundExpressionEffect.Warble, InterpolationCurve.Logarithmic), music.PlaybackMode.InBackground)
    } else if (Tone == 3) {
        music.play(music.createSoundEffect(WaveShape.Noise, 1550, 75, 71, 0, 200, SoundExpressionEffect.Tremolo, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (Tone == 4) {
        music.play(music.createSoundEffect(WaveShape.Noise, 1110, 1, 255, 0, 150, SoundExpressionEffect.Warble, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
        DropSoundAlreadyPlayed = true
    } else if (Tone == 5) {
        music.play(music.createSoundEffect(WaveShape.Square, 1645, 2448, 255, 0, 75, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    } else if (Tone == 6) {
        music.play(music.createSoundEffect(WaveShape.Square, 200, 553, 255, 0, 50, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    } else {
        music.play(music.createSoundEffect(WaveShape.Noise, 286, 1, 143, 54, 300, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)
    }
}
function ScoreBoardChanges (Message: string, Tone: number) {
    if (BoardChanges > 0) {
        PlayGameTone(Tone)
    }
    if (TutorialMode) {
        return
    }
    PiecesRemainUntilNextLevel += BoardChanges * -1
    PointsScored = ComboMultiplier * (BoardChanges * (Level * BaseScorePerPiece))
    if (PointsScored > 0) {
        info.changeScoreBy(PointsScored)
        if (ComboMultiplier > 2) {
            HiddenPlayer.sayText("" + Message + " Combo! +" + PointsScored, 1500, true)
        } else {
            HiddenPlayer.sayText("" + Message + " +" + PointsScored, 1000, true)
        }
        ComboMultiplier = ComboMultiplier * 2
    }
}
function MovePuzzlePieceUp () {
    if (!(GameIsRunning) || MakingBoardChanges) {
        return
    }
    ErasePuzzlePiece()
    if (SpaceAboveThisLocationIsBlocked(PuzzleX, PuzzleY)) {
        DrawPuzzlePiece()
        return
    }
    GetLocationForSecondPuzzlePiece()
    if (SpaceAboveThisLocationIsBlocked(SecondPieceLocation.column, SecondPieceLocation.row)) {
        DrawPuzzlePiece()
        return
    }
    if (PuzzleY <= BoardTop) {
        PuzzleY = BoardBottom
    } else {
        PuzzleY += -1
    }
    DrawPuzzlePiece()
    PlayGameTone(6)
}
function DrawPuzzlePiece () {
    tiles.setTileAt(tiles.getTileLocation(PuzzleX, PuzzleY), GetDinoTile(PuzzlePieces[0]))
    GetLocationForSecondPuzzlePiece()
    tiles.setTileAt(tiles.getTileLocation(SecondPieceLocation.column, SecondPieceLocation.row), GetDinoTile(PuzzlePieces[1]))
}
function FillEmptySpacesInRowFromStartColumn (StartColumn: number, Row: number) {
    for (let x5 = 0; x5 <= BoardRight - StartColumn; x5++) {
        Column3 = StartColumn + x5
        tiles.setTileAt(tiles.getTileLocation(Column3, Row), tiles.tileImageAtLocation(tiles.getTileLocation(Column3 + 1, Row)))
    }
    tiles.setTileAt(tiles.getTileLocation(Column3, Row), assets.tile`transparency16`)
}
function ChooseTimeTrialSettings () {
    TimeTrialMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("TIME TRIAL "),
    miniMenu.createMenuItem("ENDLESS ")
    )
    TimeTrialMenu.setTitle("GAME LENGTH")
    TimeTrialMenu.setFrame(assets.image`MenuFrame`)
    TimeTrialMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Alignment, 1)
    TimeTrialMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 8)
    TimeTrialMenu.setDimensions(scene.screenWidth() - 50, 46)
    TimeTrialMenu.setPosition(25, 70)
    TimeTrialMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        TimeTrialMenu.close()
        if (selection == "TIME TRIAL ") {
            TimeTrialMode = true
        } else {
            TimeTrialMode = false
        }
        ChooseStartingLevel()
    })
    TimeTrialMenu.onButtonPressed(controller.B, function (selection, selectedIndex) {
        TimeTrialMenu.close()
        ShowMainMenu()
    })
}
function ErasePuzzlePiece () {
    tiles.setTileAt(tiles.getTileLocation(PuzzleX, PuzzleY), assets.tile`transparency16`)
    GetLocationForSecondPuzzlePiece()
    tiles.setTileAt(tiles.getTileLocation(SecondPieceLocation.column, SecondPieceLocation.row), assets.tile`transparency16`)
}
function RowIsEmptyPastStartColumn (StartColumn: number, Row: number) {
    for (let x3 = 0; x3 <= BoardRight - StartColumn; x3++) {
        Column2 = StartColumn + x3
        if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(Column2, Row), assets.tile`transparency16`))) {
            return false
        }
    }
    return true
}
function MovePuzzlePieceLeft () {
    if (!(GameIsRunning) || MakingBoardChanges) {
        return
    }
    ErasePuzzlePiece()
    if (SpaceLeftOfThisLocationIsBlocked(PuzzleX, PuzzleY)) {
        FillEmptySpaceInRow(PuzzleY)
        MakingBoardChanges = true
    }
    GetLocationForSecondPuzzlePiece()
    if (SpaceLeftOfThisLocationIsBlocked(SecondPieceLocation.column, SecondPieceLocation.row)) {
        FillEmptySpaceInRow(SecondPieceLocation.row)
        MakingBoardChanges = true
    }
    if (MakingBoardChanges) {
        DrawPuzzlePiece()
        FillEmptySpaceInRow(PuzzleY)
        FillEmptySpaceInRow(SecondPieceLocation.row)
        DropSoundAlreadyPlayed = false
    } else {
        PuzzleX += -1
        DrawPuzzlePiece()
    }
}
function ChooseStartingLevel () {
    LevelMenu = miniMenu.createMenu(
    miniMenu.createMenuItem("LEVEL 1 "),
    miniMenu.createMenuItem("LEVEL 2 "),
    miniMenu.createMenuItem("LEVEL 4 "),
    miniMenu.createMenuItem("LEVEL 8 "),
    miniMenu.createMenuItem("LEVEL 10 ")
    )
    LevelsListed = [
    1,
    2,
    4,
    8,
    10
    ]
    LevelMenu.setTitle("STARTING LEVEL")
    LevelMenu.setFrame(assets.image`MenuFrame`)
    LevelMenu.setStyleProperty(miniMenu.StyleKind.All, miniMenu.StyleProperty.Alignment, 1)
    LevelMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 8)
    LevelMenu.setDimensions(scene.screenWidth() - 40, 82)
    LevelMenu.setPosition(20, 34)
    LevelMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        LevelMenu.close()
        Level = LevelsListed[selectedIndex]
        SetupNewGame()
    })
    LevelMenu.onButtonPressed(controller.B, function (selection, selectedIndex) {
        LevelMenu.close()
        ChooseTimeTrialSettings()
    })
}
function MakeNewPuzzlePiece () {
    PuzzleIsUpDown = true
    if (TutorialMode) {
        PuzzlePieces = [TutorialStage + 1, TutorialStage + 1]
    } else {
        PuzzlePieces = [PuzzleDrawPile._pickRandom(), PuzzleDrawPile._pickRandom()]
    }
    PuzzleX = BoardRight
    PuzzleY = BoardBottom / 2
    PuzzleSpawnPause = 0
}
function RotatePuzzlePiece (Clockwise: boolean) {
    if (!(GameIsRunning) || MakingBoardChanges) {
        return
    }
    ErasePuzzlePiece()
    PuzzleIsUpDown = !(PuzzleIsUpDown)
    GetLocationForSecondPuzzlePiece()
    if (!(tiles.tileAtLocationEquals(tiles.getTileLocation(SecondPieceLocation.column, SecondPieceLocation.row), assets.tile`transparency16`))) {
        PuzzleIsUpDown = !(PuzzleIsUpDown)
        DrawPuzzlePiece()
        return
    }
    if (PuzzleIsUpDown) {
        if (!(Clockwise)) {
            PuzzlePieces = [PuzzlePieces[1], PuzzlePieces[0]]
        }
    } else {
        if (Clockwise) {
            PuzzlePieces = [PuzzlePieces[1], PuzzlePieces[0]]
        }
    }
    DrawPuzzlePiece()
    PlayGameTone(5)
}
function TransformBoardPieces (Catalyst: Image, TargetTransform: Image, Target: Image, CatalystTransform: Image) {
    BoardChanges = 0
    for (let y1 = 0; y1 <= BoardBottom - BoardTop; y1++) {
        CurrentTransformRow = y1 + BoardTop
        for (let x1 = 0; x1 <= BoardRight - BoardLeft; x1++) {
            CurrentTransformColumn = BoardRight - x1
            if (tiles.tileAtLocationEquals(tiles.getTileLocation(CurrentTransformColumn, CurrentTransformRow), Catalyst) || EasyMode && tiles.tileAtLocationEquals(tiles.getTileLocation(CurrentTransformColumn, CurrentTransformRow), TargetTransform)) {
                if (tiles.tileAtLocationEquals(tiles.getTileLocation(CurrentTransformColumn - 1, CurrentTransformRow), Target)) {
                    if (tiles.tileAtLocationEquals(tiles.getTileLocation(CurrentTransformColumn, CurrentTransformRow), Catalyst)) {
                        tiles.setTileAt(tiles.getTileLocation(CurrentTransformColumn, CurrentTransformRow), CatalystTransform)
                    }
                    tiles.setTileAt(tiles.getTileLocation(CurrentTransformColumn - 1, CurrentTransformRow), TargetTransform)
                    BoardChanges += 1
                }
            }
        }
    }
}
let CurrentDropStep = 0
let CurrentTransformColumn = 0
let LevelsListed: number[] = []
let LevelMenu: miniMenu.MenuSprite = null
let Column2 = 0
let TimeTrialMenu: miniMenu.MenuSprite = null
let Column3 = 0
let PuzzlePieces: number[] = []
let PointsScored = 0
let TutorialStage = 0
let TransformTile: tiles.Location[] = []
let TimeTrialMode = false
let PuzzleSpawnPause = 0
let Column = 0
let MainMenu: miniMenu.MenuSprite = null
let BaseScorePerPiece = 0
let Row = 0
let PiecesScoredPerLevelUp = 0
let LevelTextSprite: TextSprite = null
let StepsPerPuzzlePieceDrop = 0
let Level = 0
let PiecesRemainUntilNextLevel = 0
let CurrentTransformRow = 0
let TutorialMode = false
let DropSoundAlreadyPlayed = false
let BoardChanges = 0
let EasyMode = false
let ComboMultiplier = 0
let PuzzleY = 0
let PuzzleX = 0
let SecondPieceLocation: tiles.Location = null
let PuzzleIsUpDown = false
let CheckLocation: tiles.Location = null
let PuzzleDrawPile: number[] = []
let SpawnPauseTime = 0
let MaximumLevel = 0
let BoardRight = 0
let BoardLeft = 0
let BoardBottom = 0
let BoardTop = 0
let BoardChangeStage = 0
let MakingBoardChanges = false
let HiddenPlayer: Sprite = null
let GameIsRunning = false
let TitleText: Sprite = null
music.play(music.stringPlayable("C E F G D E D C ", 360), music.PlaybackMode.InBackground)
scene.setBackgroundImage(assets.image`SplashScreen`)
TitleText = sprites.create(assets.image`TitleText`, SpriteKind.Player)
GameIsRunning = false
HiddenPlayer = sprites.create(assets.image`HiddenPlayer`, SpriteKind.Player)
MakingBoardChanges = false
BoardChangeStage = 0
BoardTop = 1
BoardBottom = 6
BoardLeft = 1
BoardRight = 9
let DelayPerDropStep = 120
MaximumLevel = 10
SpawnPauseTime = 600
PuzzleDrawPile = [1, 2, 3]
ShowMainMenu()
game.onUpdateInterval(DelayPerDropStep, function () {
    if (GameIsRunning) {
        PuzzleSpawnPause += DelayPerDropStep
        if (PuzzleSpawnPause >= SpawnPauseTime) {
            CurrentDropStep += 1
            if (!(MakingBoardChanges) && CurrentDropStep >= StepsPerPuzzlePieceDrop) {
                MovePuzzlePieceLeft()
                CurrentDropStep = 0
            }
        }
    }
})
game.onUpdateInterval(100, function () {
    if (!(MakingBoardChanges)) {
        if (controller.left.isPressed()) {
            MovePuzzlePieceLeft()
        }
    }
})
game.onUpdateInterval(300, function () {
    if (GameIsRunning) {
        if (MakingBoardChanges) {
            MakeBoardChanges()
        }
    }
})
