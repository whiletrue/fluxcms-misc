YUI({
	modules: {
	'gallery-slideshow-base': {
    fullpath: '/webinc/plugins/galleria-yui/js/gallery-slideshow-base.js',
    requires: ['anim','event', 'widget']
	},
    'gallery-slideshow-animated': {
        fullpath: '/webinc/plugins/galleria-yui/js/gallery-slideshow-animated.js',
        requires: ['anim', 'gallery-slideshow-base']
    }
}
}).use("gallery-slideshow-animated", function(Y) {
	
	var gallery,
		thumbs,
		i=0,
		slideInfo,
		infoAnimIn,
		prev, 
		next;
		
	// gallery
    gallery = new Y.SlideshowAnimated({contentBox: Y.one('#gallery')});
	
    slideInfo = Y.one('#gallery .slide-info');
	infoAnimIn = new Y.Anim(gallery.get('animation_in'));
    infoAnimIn.set('node', slideInfo);
   	 
	var showSlideInfo = function(slide, number) {
		slideInfo.setStyle('opacity', 0.0);
    	slideInfo.set('innerHTML', '');
   		var desc = slide.get('alt');
    	if (desc!='') {
    		slideInfo.set('innerHTML', desc);
    		infoAnimIn.run();		
    	}
	};
	
	var updatePager = function(slide, number) {
		var c = Y.one('.pager-content'),
			count=1,
			html='';
		
		if (!c) {
			return;
		}
		html = (number+1);
		count = c.getAttribute('data-count');
		if (count) {
			html+=' / '+count;
		}
		
		c.set('innerHTML', html);
		
	};
	
	gallery.stop();
    gallery.on('slideshow:before-slide-displayed', function(e) {
    	showSlideInfo(e.slide);
    	updatePager(e.slide, e.slide_number)
    });
	
	
	// thumbnails
    thumbs = Y.all('.gallery-thumbnails img.thumbnail');
    thumbs.each(function(el) {
    	var num = i;
    	el.on('click', function() {
    		gallery.show_slide(num);
    	});
    	i++;
    }, this);
    next = Y.one('.pager-next');
    if (next) {
    	next.on('click', function(e) {
    		e.preventDefault();
    		gallery.advance();
    		return false;
    	});
    }
    prev = Y.one('.pager-prev');
    if (prev) {
    	prev.on('click', function(e) {
    		e.preventDefault();
    		gallery.previous();
    		return false;
    	});
    }
    
    gallery.render();
        
    
});
      