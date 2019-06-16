function ShaveContent(element) {
    var context;
    this.body = $('body');
    this.html = $('html');
    this.shaveParagraph = $(element);
    this.textString = $(element).text();
    
    this.tabletQuery = Modernizr.mq('(min-width: 768px)');
    this.laptopQuery = Modernizr.mq('(min-width: 992px)');

    this.init = function() {
        this.viewPort();
        this.onScreenChange();
        this.responsiveOptions();
    }

    this.onScreenChange = function () {
        $(window).resize(function () {
            context.viewPort();
            setTimeout(function() {
                context.responsiveOptions();
            },200);
        });
    }

    this.responsiveOptions = function () {
        this.setLinesResponsive();
        this.viewPort();
        var character ='<span>Readmore</span>';
        setTimeout(function() {
            //var hasShave = context.shaveParagraph.children().hasClass('js-shave-char');
            //console.log(context.shaveParagraph.children());
        },1000);
        if(this.setLinesResponsive()) {
            if(context.isMobile) {
                if (context.responsiveMobile === 'auto') {
                    //shave(context.shaveParagraph, 1000, {character: '<span class="text-success">Readmore</span>'});
                    console.log('mobile auto');
                    var hasShave = context.shaveParagraph.children().hasClass('js-shave-char');

                    if (hasShave) {
                        var textFull = context.textString;
                        context.shaveParagraph.text(textFull);
                        //shave(context.shaveParagraph, auto);
                    }
                } else {
                    shave(context.shaveParagraph, parseInt(context.responsiveMobile));
                    console.log('Shave Mobile max-height: ' + parseInt(this.responsiveMobile));
                }
            } else if (context.isTablet) {
                shave(context.shaveParagraph, parseInt(context.responsiveTablet));
                console.log('Shave Tablet max-height: ' + parseInt(this.responsiveTablet));
            } else {
                shave(context.shaveParagraph, parseInt(context.responsiveDesktop));
                console.log('Shave Desktop max-height: ' + parseInt(this.responsiveDesktop));
            }
        }
    }

    this.setLinesResponsive = function() {
        this.dataResponsiveLine = this.shaveParagraph.attr('data-responsiveLine');
        if(this.dataResponsiveLine) {
            var responsiveNumberLine = [];
            responsiveNumberLine = this.dataResponsiveLine.split(",");
            this.responsiveMobile = responsiveNumberLine[0];
            this.responsiveTablet = responsiveNumberLine[1];
            // this.responsiveLabtop = responsiveNumberLine[2];
            this.responsiveDesktop = responsiveNumberLine[2];

            if (this.responsiveOption) {
                this.lineToshow = responsiveNumberLine[2];
                //this.slideToScroll = responsiveNumberItem[3];
            }
            return true;
        } else {
            return false;
        }
    }


    this.viewPort = function () {
        /* Each brouser have different vertical scrollbar */
        var scrollBarWidth = window.innerWidth - this.body.width();
        var is_safari = navigator.userAgent.indexOf("Safari") > -1;
        var isChrome = !!window.chrome && !!window.chrome.webstore;
        if (!is_safari) {
            if ($(window).width() > (992 - scrollBarWidth)) {
                this.isDesktop = true;
                this.isTablet = false;
                this.isMobile = false;
            } else if ($(window).width() > (768 - scrollBarWidth)) {
                this.isDesktop = false;
                this.isTablet = true;
                this.isMobile = false;
            } else {
                this.isDesktop = false;
                this.isTablet = false;
                this.isMobile = true;
            }
        } else if (isChrome) {
            if ($(window).width() > (992 - scrollBarWidth)) {
                this.isDesktop = true;
                this.isTablet = false;
                this.isMobile = false;
            } else if ($(window).width() > (768 - scrollBarWidth)) {
                this.isDesktop = false;
                this.isTablet = true;
                this.isMobile = false;

            } else {
                this.isDesktop = false;
                this.isTablet = false;
                this.isMobile = true;
            }
        } else {
            if ($(window).width() > 992) {
                this.isDesktop = true;
                this.isTablet = false;
                this.isMobile = false;
            } else if ($(window).width() > 768) {
                this.isDesktop = false;
                this.isTablet = true;
                this.isMobile = false;
            } else {
                this.isDesktop = false;
                this.isTablet = false;
                this.isMobile = true;
            }
        }        
        // if (context.laptopQuery) {
        //     console.log('laptop');
        // } else if(context.tabletQuery) {
        //     console.log('tablet');
        // } else {
        //     console.log('mobile');
        // }
    }

    context = this;
    this.init();

}

var shaveParagraphs = [];
$(window).on('load', function() {
    shaveParagraph_index = 0;
    $('.shaveParagraph').each(function() {
        shaveParagraphs[shaveParagraph_index] = new ShaveContent(this);
        shaveParagraph_index++;
        console.log(this);
    })
});

