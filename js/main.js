/*jslint browser: true */
/*global $:false, jQuery:false, Modernizr:false, enquire:false, console:false */

/* ==========================================================================
 JS to run on every page
 ========================================================================== */

var PAGE;

(function($) {
    "use strict";
    PAGE = (function() {
        

        function masonryCalled(){
            // or with jQuery
            var $container = $('.masonryContainer');
            // initialize Masonry after all images have loaded  
            $container.imagesLoaded( function() {
                $container.masonry({
                    columnWidth: ".column",
                    gutter: ".gutter",
                    itemSelector: "section"
                });
            });
        }
        
        $.fn.selectText = function(){
            var doc = document
                , element = this[0]
                , range, selection
            ;
            if (doc.body.createTextRange) {
                range = document.body.createTextRange();
                range.moveToElementText(element);
                range.select();
            } else if (window.getSelection) {
                selection = window.getSelection();        
                range = document.createRange();
                range.selectNodeContents(element);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        };
        
        function selectSearchText(){
            $('.search .query').click(function() {
                $(this).selectText();
            });
        }
        
        function clearSearchField() {
            $('.search .clear').click(function() {
                $('.search .query').empty().focus();
            });
        }
        
        var tags = ['charity', 'conference'];
        var tagSearch = [];
        var tagReplace = [];
        var i;

        function userAddTags() {
            function storeTag() {
                var inputVal = $('.search input').val();
                if (inputVal != '') {
                    tags.push(inputVal);
                    tagSearch = [];
                    tagReplace = [];
                    for (var i in tags) {
                        tagSearch.push(tags[i]);
                        tagReplace.push('<span contenteditable="false" class="tag">' + tags[i] +'</span>');
                    };
                    
                    $('.search input').val('');
                }
                displayTags();
            }
            $('.search button').mousedown(function(){
                storeTag();
            });
            $( '.search input' ).keypress(function( event ) {
                if ( event.which == 13 ) {
                    storeTag();
                }
            });
            function tagsReplacedInSearch() {
                $('.search .query').on('focus', function(){
                    tagSearch = [];
                    tagReplace = [];
                    for (var i in tags) {
                        tagSearch.push(tags[i]); /// this may cause errors without the Reg Exp stuff!
                        tagReplace.push('<span contenteditable="false" class="tag">' + tags[i] +'</span>');
                    };                    
                    console.log(tags + ' tags - tagsReplacedInSearch');
                    console.log(tagSearch + ' tagSearch - tagsReplacedInSearch');
                    console.log(tagReplace + ' tagReplace - tagsReplacedInSearch');
                });

                $('.search .query').keyup(function(){
                    for (var i in tagSearch) {
                        $(this).replaceText( tagSearch[i], tagReplace[i] );
                    }
                });                
            }
            tagsReplacedInSearch();
        }
        
        function displayTags(){
            var showTags = tags.toString().split(',').join(', ');
            $('.currentTags').text(showTags);
        }
        
        return {
            // public members
            init: function() {
                
                // list all of the functions that you want to call on page load here - format is:
                
                masonryCalled();
                selectSearchText();
                clearSearchField();
                userAddTags();
                displayTags();

            }
        };
    }());
    
    $(function() {
        PAGE.init();
    });



    
}(jQuery));
