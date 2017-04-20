var app = function (app) {
    app.makeController = function (stage, p, pages) {
        
        pages.on("pagetransitioned", function(e) { //or "page"
           zog(pages.page.name);
        });
        
        var hotspots = new zim.HotSpots([
            {page:p.page1, rect:p.page1.tabs.buttons[0], call:function(){pages.go(p.page2, "down");}},
            {page:p.page2, rect:p.page2.tabs.buttons[0], call:function(){pages.go(p.page1, "up");}}
        ]);
        
//        p.page1.tabs.on("change", function () {
//            zog("button = " + p.page1.tabs.text);
//             pages.go(p.page2, "down");
//        });

    };
    return app;  
}(app || {});