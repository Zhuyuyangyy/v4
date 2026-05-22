@echo off
echo Copying desktop-pet and knowledge-tree assets from v4 to v4-main...

set SRC=D:\ZYY_Project\v4\public
set DST=D:\ZYY_Project\1\v4-main\public

REM Copy Live2D cubism core
mkdir "%DST%\desktop-pet\live2d" 2>nul
copy "%SRC%\desktop-pet\live2d\live2dcubismcore.min.js" "%DST%\desktop-pet\live2d\"

REM Copy Live2D models
mkdir "%DST%\desktop-pet\live2d\models\hiyori_free_zh\2048" 2>nul
mkdir "%DST%\desktop-pet\live2d\models\hiyori_free_zh\motion" 2>nul
copy "%SRC%\desktop-pet\live2d\models\hiyori_free_zh\hiyori_free_t08.model3.json" "%DST%\desktop-pet\live2d\models\hiyori_free_zh\"
copy "%SRC%\desktop-pet\live2d\models\hiyori_free_zh\hiyori_free_t08.moc3" "%DST%\desktop-pet\live2d\models\hiyori_free_zh\"
copy "%SRC%\desktop-pet\live2d\models\hiyori_free_zh\hiyori_free_t08.physics3.json" "%DST%\desktop-pet\live2d\models\hiyori_free_zh\"
copy "%SRC%\desktop-pet\live2d\models\hiyori_free_zh\hiyori_free_t08.cdi3.json" "%DST%\desktop-pet\live2d\models\hiyori_free_zh\"
copy "%SRC%\desktop-pet\live2d\models\hiyori_free_zh\hiyori_free_t08_old.cdi3.json" "%DST%\desktop-pet\live2d\models\hiyori_free_zh\"
copy "%SRC%\desktop-pet\live2d\models\hiyori_free_zh\2048\texture_00.png" "%DST%\desktop-pet\live2d\models\hiyori_free_zh\2048\"
copy "%SRC%\desktop-pet\live2d\models\hiyori_free_zh\motion\*.motion3.json" "%DST%\desktop-pet\live2d\models\hiyori_free_zh\motion\"

REM Copy layered pet fallback images
mkdir "%DST%\desktop-pet\layered" 2>nul
copy "%SRC%\desktop-pet\layered\body.png" "%DST%\desktop-pet\layered\"
copy "%SRC%\desktop-pet\layered\head.png" "%DST%\desktop-pet\layered\"
copy "%SRC%\desktop-pet\layered\eyes.png" "%DST%\desktop-pet\layered\"
copy "%SRC%\desktop-pet\layered\frontHair.png" "%DST%\desktop-pet\layered\"
copy "%SRC%\desktop-pet\layered\shadow.png" "%DST%\desktop-pet\layered\"

REM Copy knowledge-tree assets
mkdir "%DST%\knowledge-tree" 2>nul
copy "%SRC%\knowledge-tree\knowledge-tree-red.png" "%DST%\knowledge-tree\"
copy "%SRC%\knowledge-tree\knowledge-tree-red.glb" "%DST%\knowledge-tree\"

echo Done! Now run: cd D:\ZYY_Project\1\v4-main ^&^& npm install
pause
