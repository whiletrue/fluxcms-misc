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
		next,
		stageLink;
		
	// gallery
    gallery = new Y.SlideshowAnimated({contentBox: Y.one('#gallery')});
	
    slideInfo = Y.one('#gallery .slide-info');
	infoAnimIn = new Y.Anim(gallery.get('animation_in'));
    infoAnimIn.set('node', slideInfo);
   	 
	var showSlideInfo = function(slide, number) {
		var html='', link;
		slideInfo.setStyle('opacity', 0.0);
    	slideInfo.set('innerHTML', '');
   		html = slide.get('alt');
    	
    	link = slide.get('parentNode');
    	if (link) {
    		html+= ' <a href="'+link.get('href')+'">Grossformat</a>';
    	}
    	
    	if (html!='') {
    		slideInfo.set('innerHTML', html);
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
	
	var toggleThumbnails = function(activePos) {
    	var p, num=0;
    	Y.all('.gallery-thumbnails img.thumbnail').each(function(e) {
    		if (activePos ==  num && !e.hasClass('thumbnail-active')) {
				e.addClass('thumbnail-active');
			} else {
				e.removeClass('thumbnail-active');
			}
			num++;
    	});
    };
	
	var beforeSlideDisplayed = function(e) {
    	showSlideInfo(e.slide);
    	updatePager(e.slide, e.slide_number);
    	toggleThumbnails(e.slide_number);
    };
	
	gallery.stop();
    gallery.on('slideshow:before-slide-displayed', beforeSlideDisplayed);
	
	
	// thumbnails
    thumbs = Y.all('.gallery-thumbnails img.thumbnail');
    thumbs.each(function(el) {
    	var num = i;
    	el.on('click', function(e) {
    		toggleThumbnails(num);
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
    stageLink = Y.all('.gallery-stage-link');
    stageLink.each(function(el) {
    	el.on('click', function(e) {
    		e.preventDefault();
    		gallery.advance();
    		return false;
    	});
    	
    });
	
    gallery.render();
    beforeSlideDisplayed({
    	slide: gallery.get('slides').item(gallery.display_slide), 
        slide_number: gallery.display_slide
    });
    
    
    
    
});
      