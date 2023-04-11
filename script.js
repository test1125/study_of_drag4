function mouseUp() {
    if(target){
        // console.log("mouseUp");
        target.style.pointerEvents ="auto";

        let insert = document.querySelector(".space");
        insert.replaceWith(target);
        target.style.position = "static";
        target.style.zIndex = null;
        target.style.left = null;
        target.style.top = null;
        target = null;
    }

}

function mouseMove(e) {
    if(target){
        // console.log("mouseMove");
        let cursorX = null;
        let cursorY = null;
        let hit = null;

        if(e.type == "mousemove"){
            cursorX = e.clientX;
            cursorY = e.clientY;
            hit = e.target;
            target.style.left = cursorX - gapX + "px";
            target.style.top = cursorY - gapY + "px";
        }
        else if(e.type == "touchmove"){
            cursorX = e.touches[0].clientX;
            cursorY = e.touches[0].clientY;

            //タッチによるドラッグではpointer-events: noneは機能しない
            hit = document.elementFromPoint(cursorX, cursorY);

            target.style.left = cursorX - gapX + "px";
            target.style.top = cursorY - gapY + "px";
        }

        if(hit.tagName == "LI"){
            let hitTop = hit.getBoundingClientRect().top;
            let hitBottom = hit.getBoundingClientRect().bottom;
            let hitMiddle = hitTop + (hitBottom - hitTop) / 2;

            if(cursorY < hitMiddle){
                if(document.querySelector(".space")){
                    document.querySelectorAll(".space").forEach(elm => {
                        elm.remove();
                    })
                }
                // console.log("hit Top");
                hit.insertAdjacentHTML("afterend", '<div class="space">ここに挿入</div>');
            }
            else if (cursorY > hitMiddle){
                if(document.querySelector(".space")){
                    document.querySelectorAll(".space").forEach(elm => {
                        elm.remove();
                    })
                }
                // console.log("hit bottom");
                hit.insertAdjacentHTML("beforebegin", '<div class="space">ここに挿入</div>');
            }
        }
    }
}

function mouseDown(e) {
    if(e.target.tagName != "LI" || e.target.className == "dummy"){
        return;
    }

    // console.log("mouseDown");
    target = e.target;

    //mouseoverにdragoverの役割をさせるため
    target.style.pointerEvents ="none";

    //一段ずれるのを防ぐために挿入する
    target.insertAdjacentHTML("afterend", '<div class="space">ここに挿入</div>');


    target.style.zIndex = "100";
    //mouseMoveにおいてleft, topを指定するためにabsoluteに変える
    target.style.position = "absolute";
    
    elmX = target.getBoundingClientRect().left;
    elmY = target.getBoundingClientRect().top;

    if(e.type == "mousedown"){
        gapX = e.clientX - elmX;
        gapY = e.clientY - elmY;
    }
    else if (e.type == "touchstart"){
        gapX = e.touches[0].clientX - elmX;
        gapY = e.touches[0].clientY - elmY;  
    }

    //PC
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);

    //スマホ
    document.addEventListener('touchmove', mouseMove);
    document.addEventListener('touchend', mouseUp);
}


document.addEventListener('mousedown', mouseDown);
document.addEventListener('touchstart', mouseDown);