// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile10 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile13 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile12 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile11 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "EmptyBoard":
            case "level1":return tiles.createTilemap(hex`0c000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
`, [myTiles.transparency16], TileScale.Sixteen);
            case "level":
            case "level2":return tiles.createTilemap(hex`1000100006060606060606060606060606060607050101010101020101010101010101090501010101010101010101010101010905010101010101010101010101010109050102010101010201010101010102090501010101010101010102010101010905010101010101010101010101010109050101010101010101010101010101090501010101010101010201010101010905010101010102010101010101010109050201010101010101010101010101090501010101010101010101010101010905010101010101010102010101010109050101010101010101010101010101090501010101010101010101010101010904030303030303030303030303030308`, img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, [myTiles.transparency16,sprites.castle.tileGrass2,sprites.builtin.forestTiles0,sprites.castle.tilePath8,sprites.castle.tilePath7,sprites.castle.tilePath4,sprites.castle.tilePath2,sprites.castle.tilePath3,sprites.castle.tilePath9,sprites.castle.tilePath6], TileScale.Sixteen);
            case "TutorialBoard":
            case "EmptyBoard1":return tiles.createTilemap(hex`0c000a00000000000000000000000000000000000000000000000000000101000000000000000000000101000000000000000000000101000000000000000000000101000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000`, img`
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
. . . . . . . . . . . . 
`, [myTiles.transparency16,myTiles.tile5], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "TRexEats":
            case "tile10":return tile10;
            case "TRexStarves":
            case "tile8":return tile8;
            case "TRex":
            case "tile1":return tile1;
            case "Steggo":
            case "tile2":return tile2;
            case "TRexFossil":
            case "tile9":return tile9;
            case "SteggoBones":
            case "tile13":return tile13;
            case "BushEaten":
            case "tile6":return tile6;
            case "BushLeftovers":
            case "tile12":return tile12;
            case "SteggoEaten":
            case "tile7":return tile7;
            case "BushGrows":
            case "tile3":return tile3;
            case "Soil":
            case "tile5":return tile5;
            case "SteggoEats":
            case "tile11":return tile11;
            case "Bush":
            case "tile4":return tile4;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
