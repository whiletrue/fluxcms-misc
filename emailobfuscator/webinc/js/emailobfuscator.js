// to be called on load
function initLinks() {
    var a = document.getElementsByTagName('a'),
        s = a.length,
        r = new RegExp("^mailto:(.+)");
    for(i=0; i<s; i++) {
        if (a[i].getAttribute('href').match(r)) {
            var l = a[i];
            var n;
            addEvent("click", l, function(e) {
                if(e.srcElement) e.target = e.srcElement;
                if (!e.target) {
                    return false;
                }
                
                if (e.stopPropagation) e.stopPropagation();
                if (e.preventDefault) e.preventDefault();
                n = deobfuscateLink(e.target);
                window.location.href = n.getAttribute('href');
                return false;
            });
        }
    }
}

function revRot(str) {
    return str.replace(/[a-zA-Z]/g, function(c) {
        return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26);
    });
}

function deobfuscateLink(link) {
    var clink = link.cloneNode(true);
    if (!clink) {
        return false;
    }
    var href = clink.getAttribute('href'),
    r = new RegExp("^mailto\:(.+)"),
    value,d;

    value = href.match(r);
    if (value == null) {
        return false;
    }
    d = revRot(value[1]);
    clink.setAttribute('href', 'mailto:'+d);
    return clink
}

function addEvent(event, target, method) {
    if (target.addEventListener) {
        target.addEventListener(event, method, false);
    } else if (target.attachEvent) {
        target.attachEvent("on" + event, method);
    }
}

window.onload = function() {
    initLinks();
}
