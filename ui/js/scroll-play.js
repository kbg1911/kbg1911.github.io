// 210708 버그수정 및 사파리 재대응.
// 버그수정, 모든 뷰에서 뜨는거 잘잡아주기.
window.addEventListener('load', function () {
    let isStickyPage;
    const isDebug = true;

    if (document.querySelector(".stickyContainer")) {
        isStickyPage = true;
        // console.log("isStickyPage");
    }
    else {
        isStickyPage = false;
        // console.log("isNotStickyPage");
    }

    // console.log("loadOK");


    if (isStickyPage) {
        const agent = navigator.userAgent.toLowerCase();
        let isIE = (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1);

        document.querySelector(".non-ie").style.display = 'none';
        document.querySelector(".ie").style.display = 'none';
        if (isIE) {
            if (isDebug) {
                // console.log("IE탐지");
            }
            document.querySelector(".ie").style.display = 'block';
        }
        else {
            if (isDebug) {
                // console.log("IE아님");
            }
            document.querySelector(".non-ie").style.display = 'block';
        }

        let uvPos;
        let currentFrame = 0;

        function uvPosGen(width, height) {
            uvPos = [];
            for (let i = 0; i < 7; i++) {
                for (let j = 0; j < 6; j++) {
                    if (i == 6) { uvPos.push((-(j * width) + 'px ') + (-(i * height) + 1 + 'px')); }
                    else { uvPos.push((-(j * width) + 'px ') + (-(i * height) + 'px')); }
                }
            }
        }

        if (isIE) {
            const sprites = [
                document.querySelectorAll(".sprite1")[1],
                document.querySelectorAll(".sprite2")[1],
                document.querySelectorAll(".sprite3")[1],
                document.querySelectorAll(".sprite4")[1]
            ]

            var emptyScroll = 2000;
            var container = document.getElementById("container");
            var box01 = document.getElementById("box01");
            var box03 = document.getElementById("box03");
            var box08 = document.getElementById("box08");
            var topMargin00;

            let mainContainer = this.document.querySelector('.main-container');
            mainContainer.style.overflowX = 'visible';
            window.addEventListener("scroll", compareScroll);
            // console.log('onload');
            resize();

            window.addEventListener('scroll', function (e) {
                var box01Ypos = box01.getBoundingClientRect().top;
                var box08Ypos = box08.getBoundingClientRect().top;
                boxHeight = Math.round(box08Ypos - box01Ypos + (emptyScroll * 4) + 150);
                // console.log(boxHeight);
                container.style.height = boxHeight + "px";
            })

            function compareScroll() {
                var scrollTop = window.scrollY || document.documentElement.scrollTop;
                topMargin();
                var box00Ypos = topMargin00;
                var box01Ypos = box01.getBoundingClientRect().top;
                var box03Ypos = box03.getBoundingClientRect().top;
                var box08Ypos = box08.getBoundingClientRect().top;
                var scrollheight = box03Ypos - box01Ypos;
                boxHeight = box03.getBoundingClientRect().height + 40;


                if (scrollTop < scrollheight) {
                    box00.style.position = 'relative';
                    box00.style.top = "0px";
                    boxRightMarginOff();

                } else if (scrollheight < scrollTop && scrollTop < (scrollheight + emptyScroll)) {
                    box00.style.position = 'fixed';
                    box00.style.top = -(scrollheight) + topMargin00 + "px";
                    boxRightMarginOn();
                } else if ((scrollheight + emptyScroll) < scrollTop && scrollTop < (scrollheight + emptyScroll + boxHeight)) {
                    box00.style.position = 'relative';
                    box00.style.top = "2000px";
                    boxRightMarginOff();


                } else if ((scrollheight + emptyScroll + boxHeight) < scrollTop && scrollTop < (scrollheight + emptyScroll + boxHeight + emptyScroll)) {
                    box00.style.position = 'fixed';
                    box00.style.top = -((scrollheight + boxHeight)) + topMargin00 + "px";
                    boxRightMarginOn();
                } else if ((scrollheight + emptyScroll + boxHeight + emptyScroll) < scrollTop && scrollTop < (scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight)) {
                    box00.style.position = 'relative';
                    box00.style.top = "4000px";
                    boxRightMarginOff();


                } else if ((scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight) < scrollTop && scrollTop < (scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll)) {
                    box00.style.position = 'fixed';
                    box00.style.top = -(scrollheight + boxHeight + boxHeight) + topMargin00 + "px";
                    boxRightMarginOn();
                } else if ((scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll) < scrollTop && scrollTop < (scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll + boxHeight)) {
                    box00.style.position = 'relative';
                    box00.style.top = "6000px";
                    boxRightMarginOff();


                } else if ((scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll + boxHeight) < scrollTop && scrollTop < (scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll)) {
                    box00.style.position = 'fixed';
                    box00.style.top = -(scrollheight + boxHeight + boxHeight + boxHeight) + topMargin00 + "px";
                    boxRightMarginOn();
                } else if ((scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll) < scrollTop) {
                    box00.style.position = 'relative';
                    box00.style.top = "8000px";
                    boxRightMarginOff();
                }


                if (scrollTop < scrollheight) {
                    // console.log("A");
                    currentSpriteNum = 0;
                    sprites[0].style.backgroundPosition = uvPos[0];
                }
                else if (scrollheight < scrollTop && scrollTop < (scrollheight + emptyScroll)) {
                    let startPos = (scrollheight);
                    let endPos = (scrollheight + emptyScroll);
                    // console.log("S1 Animate");
                    currentSpriteNum = 0;
                    sprites[0].style.backgroundPosition = uvPos[getFrame(startPos, endPos, scrollTop)];
                }
                else if ((scrollheight + emptyScroll) < scrollTop && scrollTop < (scrollheight + emptyScroll + boxHeight)) {
                    betweenAtoB(sprites[0], sprites[1])
                }
                else if ((scrollheight + emptyScroll + boxHeight) < scrollTop && scrollTop < (scrollheight + emptyScroll + boxHeight + emptyScroll)) {
                    let startPos = (scrollheight + emptyScroll + boxHeight);
                    let endPos = (scrollheight + emptyScroll + boxHeight + emptyScroll);
                    // console.log("S2 Animate");
                    currentSpriteNum = 1;
                    sprites[1].style.backgroundPosition = uvPos[getFrame(startPos, endPos, scrollTop)];
                }
                else if ((scrollheight + emptyScroll + boxHeight + emptyScroll) < scrollTop && scrollTop < (scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight)) {
                    betweenAtoB(sprites[1], sprites[2])
                }
                else if ((scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight) < scrollTop && scrollTop < (scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll)) {
                    let startPos = (scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight);
                    let endPos = (scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll);
                    // console.log("S3 Animate");
                    currentSpriteNum = 2;
                    sprites[2].style.backgroundPosition = uvPos[getFrame(startPos, endPos, scrollTop)];
                }
                else if ((scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll) < scrollTop && scrollTop < (scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll + boxHeight)) {
                    betweenAtoB(sprites[2], sprites[3])
                }
                else if ((scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll + boxHeight) < scrollTop && scrollTop < (scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll)) {
                    let startPos = (scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll + boxHeight);
                    let endPos = (scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll);
                    // console.log("S3 Animate");
                    currentSpriteNum = 3;
                    sprites[3].style.backgroundPosition = uvPos[getFrame(startPos, endPos, scrollTop)];
                }
                else if ((scrollheight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll + boxHeight + emptyScroll) < scrollTop) {
                    sprites[3].style.backgroundPosition = uvPos[uvPos.length - 1];
                }
            }

            function getFrame(startPos, endPos, nowPos) { // for ie
                // console.log(startPos + " / " + endPos + " / " + nowPos);
                let percent = (nowPos - startPos) / (endPos - startPos);
                // console.log(percent);

                let frame = Math.round(percent * uvPos.length);
                return frame;
            }

            function betweenAtoB(sectionA, sectionB) {
                sectionA.style.backgroundPosition = uvPos[uvPos.length - 1];
                sectionB.style.backgroundPosition = uvPos[0];
            }

            function topMargin() {
                var windowInner = window.innerWidth;
                if (windowInner > 1123.98) {
                    topMargin00 = 144;
                } else if (windowInner > 749.98 && windowInner < 1123.98) {
                    topMargin00 = 98;
                } else if (windowInner < 749.98) {
                    topMargin00 = 104;
                }
            }


            function boxRightMarginOn() {
                var windowInner = window.innerWidth;
                if (windowInner >= 1124) {
                    box0000.style.marginRight = "0rem";
                } else if (windowInner < 1124) {
                    box0000.style.marginRight = "4rem";
                }
            }

            function boxRightMarginOff() {
                box0000.style.marginRight = "0rem";
            }

            // 현페이지만 돌게 잡아야함
            window.addEventListener('resize', function () {
                resize();
                if (currentSpriteNum == 0) {
                    sprites[0].style.backgroundPosition = uvPos[currentFrame];
                }
                else {
                    for (let i = 0; i < sprites.length; i++) {
                        if (currentSpriteNum < i) {
                            sprites[i].style.backgroundPosition = uvPos[0];
                        }
                        else {
                            sprites[i].style.backgroundPosition = uvPos[uvPos.length - 1]
                        }
                    }
                    sprites[currentSpriteNum].style.backgroundPosition = uvPos[currentFrame];
                }
            });

            function resize() {
                let width = sprites[0].getBoundingClientRect().width;
                let calcHeight = Math.round(width * 0.7);
                for (let i = 0; i < sprites.length; i++) {
                    sprites[i].style.height = calcHeight + 'px';
                }
                uvPosGen(width, calcHeight);
            }
        }
        else {
            const sprites = [
                document.querySelectorAll(".sprite1")[0],
                document.querySelectorAll(".sprite2")[0],
                document.querySelectorAll(".sprite3")[0],
                document.querySelectorAll(".sprite4")[0]
            ]

            let stickys = {};
            let stickyCount = 4;
            let eachStickyScroll = 2000;
            let stickyContainerTop = 0;
            let currentTop = 0;
            let stickyPadding = 100;
            let distanceY = 0;

            let stickyContainer = document.querySelector(".stickyContainer");
            let scrollHeight = document.querySelector(".scrollHeight");
            const startDelay = 300;
            const endDelay = 300;
            let currentSpriteNum = 0;


            if (stickyContainer != null) {
                let mainContainer = this.document.querySelector('.main-container');
                mainContainer.style.overflowX = 'visible';
                window.addEventListener("scroll", compareScroll);
                // console.log("non-ie Load");
                resize();
                initHeight();
            }


            function onLoadInit() {

                distanceY = Number(scrollHeight.getBoundingClientRect().top) - Number(stickyContainer.getBoundingClientRect().bottom);

                for (let i = 1; i < (stickyCount + 1); i++) {
                    stickys['sticky' + i] = {};
                    stickys['sticky' + i].top = document.querySelector(".sticky" + i).getBoundingClientRect().top + window.pageYOffset + distanceY;
                    stickys['sticky' + i].bottom = document.querySelector(".sticky" + i).getBoundingClientRect().bottom + window.pageYOffset + distanceY;
                    stickys['sticky' + i].height = stickys['sticky' + i].bottom - stickys['sticky' + i].top;
                    stickys['sticky' + i].startScroll = stickys['sticky' + i].top + (eachStickyScroll * i);
                };

                for (let i = 1; i < stickyCount; i++) {
                    stickys['sticky' + i].endScroll = stickys['sticky' + (i + 1)].top + (eachStickyScroll * i);
                }

            }

            function initHeight() {
                let stickysHeight = ((eachStickyScroll * (stickyCount))) + "px";
                scrollHeight.style.height = stickysHeight;
            }

            function compareScroll() {
                if (window.scrollY < stickys.sticky1.startScroll) {
                    currentSpriteNum = 0;
                    stickyContainerTop = currentTop = stickys.sticky1.top - stickys.sticky1.top + stickyPadding;
                    let frame = getFrame(stickys.sticky1.top, 0);
                    currentFrame = frame;
                    sprites[0].style.backgroundPosition = uvPos[frame];

                    if (frame <= 0) { sprites[0].style.backgroundPosition = uvPos[0]; }
                }
                else if (window.scrollY > stickys.sticky1.startScroll && window.scrollY < stickys.sticky1.endScroll) {
                    currentTop = stickys.sticky1.top - stickys.sticky1.top + stickyPadding;
                    stickyContainerTop = (stickys.sticky1.startScroll - window.scrollY) + currentTop;
                    betweenAtoB(sprites[0], sprites[1]);
                }
                else if (window.scrollY > stickys.sticky1.endScroll && window.scrollY < stickys.sticky2.startScroll) {
                    currentSpriteNum = 1;
                    stickyContainerTop = currentTop = stickys.sticky1.top - stickys.sticky2.top + stickyPadding;
                    let frame = getFrame(stickys.sticky2.top, 1);
                    currentFrame = frame;
                    sprites[1].style.backgroundPosition = uvPos[frame];

                }
                else if (window.scrollY > stickys.sticky2.startScroll && window.scrollY < stickys.sticky2.endScroll) {
                    currentTop = stickys.sticky1.top - stickys.sticky2.top + stickyPadding;
                    stickyContainerTop = (stickys.sticky2.startScroll - window.scrollY) + currentTop;
                    betweenAtoB(sprites[1], sprites[2]);
                }
                else if (window.scrollY > stickys.sticky2.endScroll && window.scrollY < stickys.sticky3.startScroll) {
                    currentSpriteNum = 2;
                    stickyContainerTop = currentTop = stickys.sticky1.top - stickys.sticky3.top + stickyPadding;
                    let frame = getFrame(stickys.sticky3.top, 2);
                    currentFrame = frame;
                    sprites[2].style.backgroundPosition = uvPos[frame];
                }
                else if (window.scrollY > stickys.sticky3.startScroll && window.scrollY < stickys.sticky3.endScroll) {
                    currentTop = stickys.sticky1.top - stickys.sticky3.top + stickyPadding;
                    stickyContainerTop = (stickys.sticky3.startScroll - window.scrollY) + currentTop;
                    betweenAtoB(sprites[2], sprites[3]);
                }
                else if (window.scrollY > stickys.sticky3.endScroll) {
                    currentSpriteNum = 3;
                    stickyContainerTop = currentTop = stickys.sticky1.top - stickys.sticky4.top + stickyPadding;
                    let frame = getFrame(stickys.sticky4.top, 3)
                    currentFrame = frame;
                    sprites[3].style.backgroundPosition = uvPos[frame];

                    if (frame >= uvPos.length - 1) { sprites[3].style.backgroundPosition = uvPos[uvPos.length - 1]; }
                }
                stickyContainer.style.top = stickyContainerTop + "px";
            }

            function getFrame(sectionTop, stickyNum) {
                let frame;
                if (stickyNum == stickyCount - 1) {
                    frame = Math.round(
                        ((window.scrollY - ((sectionTop + startDelay) + (eachStickyScroll * stickyNum))) / (eachStickyScroll - startDelay - 400))
                        * uvPos.length - 1
                    );
                }
                else {
                    frame = Math.round(
                        ((window.scrollY - ((sectionTop + startDelay) + (eachStickyScroll * stickyNum))) / (eachStickyScroll - startDelay - endDelay))
                        * uvPos.length - 1
                    );
                }
                return frame;
            }

            function betweenAtoB(sectionA, sectionB) {
                sectionA.style.backgroundPosition = uvPos[uvPos.length - 1];
                sectionB.style.backgroundPosition = uvPos[0];
            }

            if (stickyContainer != null) {
                window.addEventListener('resize', function () {
                    resize();
                    if (currentSpriteNum == 0) {
                        sprites[0].style.backgroundPosition = uvPos[currentFrame];
                    }
                    else {
                        for (let i = 0; i < sprites.length; i++) {
                            if (currentSpriteNum < i) {
                                sprites[i].style.backgroundPosition = uvPos[0];
                            }
                            else {
                                sprites[i].style.backgroundPosition = uvPos[uvPos.length - 1]
                            }
                        }
                        sprites[currentSpriteNum].style.backgroundPosition = uvPos[currentFrame];
                    }
                });
            }

            function resize() {
                let width = sprites[0].getBoundingClientRect().width;
                let calcHeight = Math.round(width * 0.7);
                for (let i = 0; i < sprites.length; i++) {
                    sprites[i].style.height = calcHeight + 'px';
                }
                onLoadInit();
                uvPosGen(width, calcHeight);
            }
        }
    }

});