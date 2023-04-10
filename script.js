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
        target.style.left = e.clientX-gapX + "px";
        target.style.top = e.clientY-gapY + "px";
        if(e.target.tagName == "LI"){
            let hitTop = e.target.getBoundingClientRect().top;
            let hitBottom = e.target.getBoundingClientRect().bottom;
            let hitMiddle = hitTop + (hitBottom - hitTop) / 2;

            if(e.clientY < hitMiddle){
                if(document.querySelector(".space")){
                    document.querySelectorAll(".space").forEach(elm => {
                        elm.remove();
                    })
                }
                // console.log("hit Top");
                e.target.insertAdjacentHTML("afterend", '<div class="space">ここに挿入</div>');
            }
            else if (e.clientY > hitMiddle){
                if(document.querySelector(".space")){
                    document.querySelectorAll(".space").forEach(elm => {
                        elm.remove();
                    })
                }
                // console.log("hit bottom");
                e.target.insertAdjacentHTML("beforebegin", '<div class="space">ここに挿入</div>');
            }
        }
    }
}

document.addEventListener("mousedown", e=> {
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
    gapX = e.clientX - elmX;
    gapY = e.clientY - elmY;

    
    target.style.left = elmX + "px";
    target.style.top = elmY + "px";
    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
})
