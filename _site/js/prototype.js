/*jshint browser: true, devel: true, jquery: true*/



$(document).ready(function () {
    
    // Max amount for grants 'showing. and function to keep number between 0 and max_showing.
    var max_showing = 131;
    var max_min_count = function(number){
        var count = number;
        if (count > 131) {
            count = 131;
        } else if (count < 10) {
            count = 11;
        }
        return count; 
    };
    
    
    // Main navigation functionality
    $('.navbar-nav .nav-item.dropdown').on('click', function(){
        $(this).find('.navigation-first-level-menu').toggleClass('show');
    });

    $('body').click(function(e){
        var top_menu_link = $('.navigation-main-menu > .nav-item').has(e.target).length > 0,
            dropdown_menu = $('dropdown-menu').has(e.target).length > 0;
        
        if(!top_menu_link) {
            
            $('.dropdown-menu').each(function(){
                $(this).removeClass('show');
            });
        } else {
        }
    });
    
    // Main nav - top level links
    $('#navbarDropdownMenuLink_0').on('click', function(e){
        e.preventDefault();
    });
    $('#navbarDropdownMenuLink_1').on('click', function(e){
        e.preventDefault();
    });
    $('#navbarDropdownMenuLink_2').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-events-finder/finder/tool.html";
    });
    $('#navbarDropdownMenuLink_3').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-events-finder/expertise-and-advice.html";
    });
    $('#navbarDropdownMenuLink_4').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-events-finder/events/events-finder.html";
    });
    $('#navbarDropdownMenuLink_5').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-events-finder/news.html";
    }); 

    // Mobile nav (for the moble test version only)
    $('.mobile-test .collapse').css('display', 'none');
    
    $('#ChangeToggle').on('click', function(){
        $('.mobile-test .collapse').toggleClass('open');
    });
    
    $('.mobile-test #navbarDropdownMenuLink_0').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-events-finder/registrations";     
    });
    $('.mobile-test #navbarDropdownMenuLink_1').on('click', function(e){
        e.preventDefault();
        window.location.pathname = "/bga-events-finder/planning";
    });
    
    $('#ChangeToggle').on('click', function(){
        $('#navigation-bar').slideToggle();
    });
    $(window).on('resize', function(){
        if ($(window).width() < 770) {
            $('#navigation-bar').hide();
        } else {
           $('#navigation-bar').show(); 
        }
    });
    
    
    
    // Information page accordions
    $('.accordion-item-tile').on('click', function(){
        $(this).parents('.accordion-item').toggleClass('open');
        $(this).parents('.accordion-item').find('.accordion-item-content').slideToggle(400);
    });
    
    
    
    // Prevent click empty 'a' tag from causing scrolling
    $('a').on('click', function(e){
        if (! $(this).attr('href') ) {
            e.preventDefault();
        }
    });
    
    
    // Hide empty breadcrumb links and arrows
    $('a.breadcrumb-link').each(function(){
        if( $(this).is(':empty') ) {
            var wrapper = $(this).parent('.breadcrumb-home-wrapper');
            $(wrapper).remove();
        }
    });
    $('.breadcrumb-home-wrapper').last().addClass('last');

    /*----------- Add side-menu (sticky_list) functionality ----------- */
    
    // Function for menu stickiness on scroll (called within the if .anchor-menu .sticky-container exists block)
    function add_position(positions) {

        for (var i = 0; i < positions.length; i++) {
            var top_position = positions[i];
            if ($(window).scrollTop() >= top_position) {
                $('.anchor-menu a').removeClass('active-sticky');
                $('.anchor-menu a[data-value=' + positions[i] + ']').addClass('active-sticky');
            }
        }
    }
    
    // Function to make the side menu sticky
    var stickyPosition = $('.anchor-menu').offset(); //This var is outside the function because it needs to be determined BEFORE window resizing,.
    
    function menuStickiness() {
        
        var win = $(window),
            stickyWidth = $('.twoCol39-left').width();
        
        // Set side-menu initial horizontal position 
        if(win.width() < 575) {
            $('.anchor-menu').css('position', 'relative').css('top', 'auto');
        } else if (win.width() >= 575) {
            if (win.scrollTop() >= stickyPosition.top) {
                $('.anchor-menu').css('position', 'fixed').css('top', '32px').css('width', stickyWidth);
            } else {
                $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
            }
        } 
        
        // Reset side-menu position on scroll
        $(window).scroll(function () {

            stickyWidth = $('.twoCol39-left').width();

            if (win.width() < 575) {
                $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
            } else if (win.width() >= 575) {
                if (win.scrollTop() >= stickyPosition.top) {
                    $('.anchor-menu').css('position', 'fixed').css('top', '32px').css('width', stickyWidth);
                } else if (win.scrollTop() < stickyPosition.top) {
                    $('.anchor-menu').css('position', 'relative').css('top', 'auto').css('width', stickyWidth);
                }
            }
        });
    }

    if ($( ".anchor-menu .sticky-container" ).length) {

        // Apply menu stickiness
        menuStickiness();
        
        // Side menu scroll to section of the page
        // and add top position of element to anchor link as a data-value
        $('.anchor-menu a').each(function(){
            
            // Get rid of punctuation before converting it an ID.
             var a_text = $(this).text(),
                element_name = a_text.replace(". ", "");
                element_name = element_name.replace(/\s+/g, '-').toLowerCase();
                element_name = element_name.replace("'", "");
                element_name = element_name.replace(",", "");
                element_name = element_name.replace(/[0-9]/g, '');
                var name_str = '#' + element_name;
                var element_position = $(name_str).offset();
                //console.log(element_position);
                      
            if ($(name_str).length){
                $(this).attr('data-value', Math.round(element_position.top));
        
                $(this).on('click', function(){
                    $([document.documentElement, document.body]).animate(
                        { scrollTop: $(name_str).offset().top }, 400);
                    $('.anchor-menu a').removeClass('active-sticky');
                    $(this).addClass('active-sticky');
                });
            }   
        });   
    } // END if .anchor-menu .sticky-container EXISTS
    
    // Menu stickiness on .resize()
    $(window).on('resize', function(){
        if ($( ".anchor-menu .sticky-container" ).length) {
            menuStickiness();
        }
    });
    

   
    // Modal functionality
    // Empty href modal
    $('a[href=""]').on("click", function(){
        if (!$(this).parents('.sticky-container').length && !$(this).hasClass("guide_navlink")){
            $(".modal-wrapper").addClass("active");
            $(".modal-background").addClass("active");
        }
    });
    
    $('.inactive-path').on("click", function(){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });
    
    $(".modal-close").on("click", function(){
        $(".modal-wrapper").removeClass("active");
        $(".modal-background").removeClass("active");
    });

    $(".modal-background").on("click", function(){
        $(".modal-wrapper").removeClass("active");
        $(".modal-background").removeClass("active");
        $(".shortlist-wrapper-2").removeClass("active");
    });
    
    // Search not working modal
    $(".search-bar-search").on("click", function(){
        $(".modal-wrapper").addClass("active");
        $(".modal-background").addClass("active");
    });



    // FILTER ACCORDIONS
    // Open filter accordions
    $('.filter-item-title').on('click', function(){
        
        if ( $(this).hasClass('open') ) {
            $(this).parents('.filter-item').find('.filter-item-content').slideUp();
            $(this).removeClass('open');
        } else { 
            $('.filter-item-content').slideUp();
            $('.filter-item-title').removeClass('open');
            
            $(this).parents('.filter-item').find('.filter-item-content').slideDown();
            $(this).addClass('open');
        }
        
    });
   
    
    // FILTER SELECTONS
    // Select filter 'bubble' options - multiple select
    $('.active-filters.multi-select li').on('click', function(){
        
        var filter_option = $(this).attr('data-value');
        sessionStorage.setItem(filter_option, false);
    
        $(this).toggleClass('selected');
        $('#' + filter_option).parent('.checkbox-item').toggleClass('selected');
        
        total_active_filters();
        
    });
    
    
    // Select filter 'bubble' options-single select
     $('.active-filters.single-select li').on('click', function(){
         
        var filter_type = $(this).parents('.filter-item').attr('id');
        if ($(this).hasClass('filter-toggle-switch')) {
            sessionStorage.setItem(filter_type + " selection", 0);
        } else {
         
            $(this).parents('.active-filters').find('li').removeClass('selected');
            $('.dynamic-question').addClass('disabled');
            $('input[toggle-filter-type="' + filter_type + '-toggle"]').prop('checked', false).removeClass('selected').attr("disabled", true);

            $('#question-' + filter_type + ' select').val('select-option');     
            $('#' + filter_type + ' .filter-item-content select').val('select-option');

            sessionStorage.setItem(filter_type + " selection", 'select-option');
            
            sessionStorage.setItem(filter_type + "-toggle", 0);
        }
         
    });
    
    // Select single select options
    $('.filter-item-content select').change(function(){
        
        var filter_type = $(this).parents('.filter-item').attr('id');
        var filter_option = $(this).val();

        $('#' + filter_type + ' .active-filters.single-select li').removeClass('selected');
        $('#' + filter_type + ' .active-filters.single-select li[data-value="' + filter_option + '"]').addClass('selected');   
        $('#question-' + filter_type + ' select').val(filter_option);
        
        // Add to sessionStorage 
        sessionStorage.setItem(filter_type + " selection", filter_option);
        
        // Disable dynamic toggle question
        if(filter_option !== "select-option") {
            $('.dynamic-question').removeClass('disabled');
            
            $('input[toggle-filter-type="' + toggle_option + '"]').removeAttr("disabled");
            $('.active-filters li[filter-type="' + toggle_option + '"]').removeClass('selected');
            
            $('input[toggle-filter-type="' + toggle_option + '"]').prop('checked', false).removeClass('selected').attr("disabled", false);
            
        } else {
            $('.dynamic-question').addClass('disabled');
            
            $('.active-filters li[filter-type="' + toggle_option + '"]').removeClass('selected');
            
            $('input[toggle-filter-type="' + toggle_option + '"]').prop('checked', false).removeClass('selected').attr("disabled", true);
        }
        
        if (toggle_option === 'industry-toggle') {
            sessionStorage.setItem('industry-toggle', 0);
        }
   
    });
    
    // Select filter checkbox options
    $('.checkbox-item label').on('click', function(){
        
        var filter_option = $(this).parents('.checkbox-item').find('input').attr('id');
        
        $(this).parents('.checkbox-item').toggleClass('selected');
        $(this).parents('.filter-item').find('.active-filters li[data-value="' + filter_option +'"]').toggleClass('selected ');
                
        if ($(this).parents('.checkbox-item').hasClass('selected')) {
            sessionStorage.setItem(filter_option, true);
        } else {
            sessionStorage.setItem(filter_option, false);
        }
                   
    }); 
    
    // Select filter text input options
    $('.text-field-filter button').on('click', function(){
        var postcode = $(this).parents('.filter-item-content').find('input').val();
        var filter_option = $(this).parents('.filter-item').attr('id');
        
        $(this).parents('.text-field-filter').find('.active-filters li').text(postcode).addClass('selected');
        sessionStorage.setItem(filter_option, true);
        sessionStorage.setItem(filter_option + "_value", postcode);
    });
    $(".text-select li").on('click', function(){
        var filter_option = $(this).parents('.filter-item').attr('id');
        console.log(filter_option);
        
        sessionStorage.setItem(filter_option, "false");
        $(this).removeClass('selected');
        
    });
    
    
    // Select filter radio button options
    $('.radio-button label').on('click', function(){
        $('.radio-button label').each(function(){
            $(this).removeClass('selected');
        });
        $(this).toggleClass('selected');
    });
    
    // Toggle switch questions  
    $('.filter-item .custom-control-input').on('click', function(){
        var filter_type = $(this).attr('id');
        filter_type = filter_type.slice(7, filter_type.length);
        console.log(filter_type);
        
        if ($(this).is(":checked")) { 
            $(this).toggleClass('selected');
            $('li[data-value="' + filter_type + '"]').toggleClass('selected');   
            $('#'+ filter_type + '-switch').prop('checked', true).toggleClass('selected');
            
        } else {
            $(this).toggleClass('selected');
            $('li[data-value="' + filter_type + '"]').toggleClass('selected');
            $('#'+ filter_type + '-switch').prop('checked', false).toggleClass('selected');
        }
    });
   


    // FUNCTION TO COUNT and SET active filter counts
    var all_filter_types = ['date', 'topic', 'business-location', 'online', 'in-person', 'past-recorded-events'];
    
    
    // MOBILE FILTER VISIBILITY
    $('.view-filters').on('click', function(){
        $('.filter-wrapper').addClass('active');
        $('.modal-background').addClass('active');

        //add active state to mobile filter counters
        for (var m = 0; m < all_filter_types.length; m++) {
            var filter_type = sessionStorage.getItem(all_filter_types[m]);
            if (filter_type !== null) {           
                $('#' + all_filter_types[m] + ' .mobile-counter').text(filter_type).addClass('active');
            }
        }
        
        //Close open filter accordions
        $('.filter-item-content').hide();
         $('.filter-item-title').removeClass('open');
        
    });
    $('.filter-wrapper .modal-close').on('click', function(){
        $('.filter-wrapper').removeClass('active');
        $('.modal-background').removeClass('active');
        
    });
    $('.mobile-apply-filters-button').on('click', function(){
        $('.filter-wrapper').removeClass('active');
        $('.modal-background').removeClass('active');
    });
    
    // RESULTS CARDS

    
    
    
    // CLEAR ALL FILTERS / QUESTIONS
    var clear_filters = function(){
        $('.active-filters li.selected').removeClass('selected');
        $('.checkbox-item.selected').removeClass('selected');

        $('.filter-item-title').removeClass('open');
        $('.filter-item-content').slideUp();
        $('.filter-item .custom-control-input').prop('checked', false).removeClass('selected');
        
        sessionStorage.setItem('showing', max_showing);
        $('span.number').text(sessionStorage.getItem('showing'));
        
        sessionStorage.clear();
        
        $('.mobile-counter').each(function(){
            $(this).removeClass('active').text(0);
        });
        $('.filter-counter').text(0);
    };
    
    $('.clear-all').on('click', function(){
        clear_filters();
    });
    
    
    
    // FUNCTION COUNT TOTAL NUMBER OF ACTIVE FILTERS
    var total_active_filters = function(){
       
        var total_active = 0;

        for ( var k = 0; k < all_filter_types.length; k++){ 
            
            var filter_type = all_filter_types[k];
            var filter_count = parseInt(sessionStorage.getItem(filter_type));
            
            if(isNaN(filter_count)) {
                filter_count = 0;
            }
            total_active = total_active + filter_count;
        }
        
        $('.filter-counter').text(total_active);
    };

        
    // SET ACTIVE FILTERS ON PAGE LOAD - MULTIPLE SELECT
    $('#postcode .active-filters li').text(sessionStorage.getItem('postcode_value'));
    
    var filter_set_multiple = ['business-finance', 'business-planning', 'contracting-and-tendering', 'customer-service', 'digital-business', 'employing-people', 'exporting', 'government-grant-programs', 'industry-compliance', 'innovation-and-commercialisation', 'marketing', 'networking', 'starting-a-business', 'taxation-and-record-keeping', 'work-health-and-safety', 'online-events', 'in-person-events', 'past-recorded-events', 'past-dates', 'this-month', 'this-month-plus-1', 'this-month-plus-2', 'this-month-plus-3', 'postcode'];
    
    
    
    for ( var filter = 0; filter < filter_set_multiple.length; filter++) {
        
        var filter_option = filter_set_multiple[filter];
            
            if (sessionStorage.getItem(filter_option) === "true") {  
                // Select filters on the page       
                $('.active-filters li[data-value="' + filter_option + '"]').toggleClass('selected');    
                $('#' + filter_option).parent('.checkbox-item').toggleClass('selected');
            }
    }
    
    // RADIO BUTTONS ['past-dates', 'this-month', 'this-month-plus-1', 'this-month-plus-2', 'this-month-plus-3', 'custom-date-range']
    
    
    
    
    // SET ACTIVE FILTERS ON PAGE LOAD - SINGLE SELECT   
    // function for reset each filter set
    /*var set_single_filters = function(filter_type, filter_set){
        
        var filter_option = sessionStorage.getItem(filter_type + ' selection');
        if (filter_option === null) {
            filter_option = 'select-option';
        }
        
        $('select[select-filter-type="' + filter_type + '"]').val(filter_option);     

        $('#' + filter_type + ' select').val(filter_option); 

        $('#' + filter_type + ' .active-filters.single-select li').removeClass('selected');
        $('#' + filter_type + ' .active-filters.single-select li[data-value="' + filter_option + '"]').addClass('selected');
 
     };
    
    // Filter sets
    var filter_set_industry = ['select-option', 'accommodation-and-food-services', 'administrative-and-support-services', 'agriculture-forestry-and-fishing', 'arts-and-recreation-services', 'construction', 'education-and-training', 'electricity-gas-water-and-waste-services', 'financial-and-insurance-services', 'health-care-and-social-assistance', 'information-media-and-telecommunications', 'manufacturing', 'mining', 'professional-scientific-and-technical-services', 'public-administration-and-safety', 'rental-hiring-and-real-estate-services', 'retail-trade', 'transport-postal-and-warehousing', 'wholesale-trade', 'other-services'];
    
    var filter_set_business_type = ['select-option','sole-trader', 'partnership', 'company', 'trust', 'not-for-profit'];
   
    var filter_set_business_stage = ['select-option', '2-years-or-less', '3-and-5-years', 'more-than-5-years'];
    
    set_single_filters('industry', filter_set_industry);
    set_single_filters('business-type', filter_set_business_type);
    set_single_filters('business-stage', filter_set_business_stage);
    */
    
    
    // SET TOGGLE SWITCH QUESTIONS ON PAGE LOAD.
    var filter_set_toggles = ['online', 'in-person', 'past-recorded-events'];
    
    for ( var toggle = 0; toggle < filter_set_toggles.length ; toggle++){
        var toggle_option = filter_set_toggles[toggle];
        //console.log(toggle_option);
        
        if (sessionStorage.getItem(toggle_option) === '1') {  
            $('input[toggle-filter-type="' + toggle_option + '"]').prop('checked', true).toggleClass('selected');
            
            $('.active-filters li[filter-type="' + toggle_option + '"]').toggleClass('selected');
            var dynamic_question = $('#question-' + toggle_option);
            $('#question-' + toggle_option).removeClass('disabled');
        } 
        
    }
    
 
    
    // SET FILTER COUNT ON PAGE LOAD
    total_active_filters();
    

    //CREATE 'SHOWING' NUMBER
    var showing = sessionStorage.getItem('showing');
    
    if (showing === null) {
        showing = 131;
    }
    if(sessionStorage.getItem('name-filter') !== null) {
        sessionStorage.removeItem('name-filter');
        showing = 131;
    }
    $('span.number').text(showing);
    
    $('[filter-type]').on('click', function(){

        var filter_type = $(this).attr('filter-type'),
            select_filter_type = $(this).attr('select-filter-type'),
            result_count = parseInt(sessionStorage.getItem('showing')),
            filter_value = parseInt($(this).attr('filter-value')),
            filter_type_current_value = parseInt(sessionStorage.getItem(filter_type));
        
        if (isNaN(filter_type_current_value)){
            filter_type_current_value = 0;
        }
        if (isNaN(result_count)){
            result_count = parseInt(max_showing);
        }
        
        var reduced_count = Math.round(result_count - 70),
            restore_count = Math.round(result_count + 70),
            new_count_minus = result_count - filter_value,
            new_count_plus = result_count + filter_value;
        
        reduced_count = max_min_count(reduced_count);
        restore_count = max_min_count(restore_count);
        new_count_minus = max_min_count(new_count_minus);
        new_count_plus = max_min_count(new_count_plus); 
        
        // First use of a filter type
        if (filter_type_current_value === 0) {

            if ($(this).hasClass('selected')) {
                $('span.number').text(reduced_count);
                sessionStorage.setItem('showing', reduced_count);
                sessionStorage.setItem(filter_type, filter_type_current_value + 1);
                $('.filter-item#' + filter_type).find('.mobile-counter').text(filter_type_current_value + 1).addClass('active');
                
                total_active_filters();
                return false;
                
            } else {
                // This is not a possible scenario  
            }
            
        
            
        // Catch the last use of a filter type and reset
        } else if (filter_type_current_value === 1) {  
            if ($(this).hasClass('selected')) {
                $('span.number').text(new_count_plus);
                sessionStorage.setItem('showing', new_count_plus);
                sessionStorage.setItem(filter_type, filter_type_current_value + 1);
                $('.filter-item#' + filter_type).find('.mobile-counter').text(filter_type_current_value + 1).addClass('active');
                
                total_active_filters();
                return false;
                
                
            } else {
                $('span.number').text(restore_count);
                sessionStorage.setItem('showing', restore_count);
                sessionStorage.setItem(filter_type, filter_type_current_value - 1);
                $('.filter-item#' + filter_type).find('.mobile-counter').text(filter_type_current_value - 1).removeClass('active');
                
                total_active_filters();
                return false;
            }
            
            
            
        }
        
        // All other clicks on a filter type
        else {
            if ($(this).hasClass('selected')) {
                $('span.number').text(new_count_plus);
                sessionStorage.setItem('showing', new_count_plus);
                sessionStorage.setItem(filter_type, filter_type_current_value + 1);
                $('.filter-item#' + filter_type).find('.mobile-counter').text(filter_type_current_value + 1).addClass('active');
                
                total_active_filters();
                return false;
                
            } else {  
                $('span.number').text(new_count_minus);
                sessionStorage.setItem('showing', new_count_minus);
                sessionStorage.setItem(filter_type, filter_type_current_value - 1);
                $('.filter-item#' + filter_type).find('.mobile-counter').text(filter_type_current_value - 1).addClass('active');
                
                total_active_filters();
                return false;
                
            }
        }


    });
    
    $('[select-filter-type]').change(function(){
        
        var filter_type = $(this).attr('select-filter-type'),
            result_count = parseInt(sessionStorage.getItem('showing')),
            filter_value = parseInt($(this).attr('filter-value')),
            filter_type_current_value = parseInt(sessionStorage.getItem(filter_type));
        
        if (isNaN(filter_type_current_value)){
            filter_type_current_value = 0;
        }
        if (isNaN(result_count)){
            result_count = parseInt(max_showing);
        }
        
        var reduced_count = Math.round(result_count - 93),
            new_count_plus = result_count + filter_value;

        reduced_count = max_min_count(reduced_count);
        new_count_plus = max_min_count(new_count_plus);  
 
        $('span.number').text(reduced_count);
        sessionStorage.setItem('showing', reduced_count);
        sessionStorage.setItem(filter_type, 1);
        
        $('.filter-item#' + filter_type).find('.mobile-counter').text(1).addClass('active');

        //Set total filter count
        total_active_filters();
    });
    
    $('[toggle-filter-type]').change(function(){
        
        var filter_type = $(this).attr('toggle-filter-type'),
            result_count = parseInt(sessionStorage.getItem('showing')),
            filter_value = parseInt($(this).attr('filter-value')),
            filter_type_current_value = parseInt(sessionStorage.getItem(filter_type));
        
        if (isNaN(filter_type_current_value)){
            filter_type_current_value = 0;
        }
        if (isNaN(result_count)){
            result_count = parseInt(max_showing);
        }
        
        var reduced_count = Math.round(result_count - filter_value),
            restore_count = Math.round(result_count + filter_value);

        reduced_count = max_min_count(reduced_count);
        restore_count = max_min_count(restore_count);  

        if (!$(this).is(":checked")) {
            $('span.number').text(restore_count);
            sessionStorage.setItem('showing', restore_count);
            sessionStorage.setItem(filter_type, 0);
            
            $('.filter-item#' + filter_type).find('.mobile-counter').text(0).removeClass('active');
        } else {
            $('span.number').text(reduced_count);
            sessionStorage.setItem('showing', reduced_count);
            sessionStorage.setItem(filter_type, 1);
        }
        
        //Set total filter count
        total_active_filters();
    });
    
    
    
    // VARY SEARCH RESULT CARDS ON DISPLAY
    
    // Create variables for storing search card ids 
    /*var card_ids_task_1 = ["#search-result-1", "#search-result-2", "#search-result-3", "#search-result-4", "#search-result-5", "#search-result-6", "#search-result-7", "#search-result-8", "#search-result-9", "#search-result-10"];
    var card_ids_task_2 = ["#search-result-11", "#search-result-12", "#search-result-13", "#search-result-14", "#search-result-15", "#search-result-16", "#search-result-17", "#search-result-18", "#search-result-19", "#search-result-20"];
    
    // Create sets of card HTML
    var search_cards_task_1 = {};
    var search_cards_task_2 = {};

    var create_card_set = function(card_identifiers, card_set, cards){
        $(card_identifiers).each(function(){
            cards['#' + $(this).attr('id')] = $(this).html();
        }); 
    };
    
    create_card_set('.result-task-1', card_ids_task_1, search_cards_task_1);  
    create_card_set('.result-task-2', card_ids_task_2, search_cards_task_2);  
    
    // Function to shuffle the id order in their array
    function Shuffle(o) {
        for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
    
    // Function to rearrange cards on display. Uses presence sessionStorage('purchase-or-upgrade-equipment-vehicles-or-tools') to determine whether cards are from the Task_1 or Task_2 set.
    function rearrange_cards(){
    
        $('.results-wrapper').empty();
        var task2 = sessionStorage.getItem('purchase-or-upgrade-equipment-vehicles-or-tools');
        
        if (task2 === 'true') {
            var shuffled_cards_2 = Shuffle(card_ids_task_2);
            for (var id_1 = 0; id_1 < shuffled_cards_2.length; id_1++) {
                $('.results-wrapper').append('<div class="search-card-result">' + search_cards_task_2[shuffled_cards_2[id_1]] + '</div>');
            }
        } else {
            var shuffled_cards_1 = Shuffle(card_ids_task_1);
            for (var id_2 = 0; id_2 < shuffled_cards_1.length; id_2++) {
                $('.results-wrapper').append('<div class="search-card-result">' + search_cards_task_1[shuffled_cards_1[id_2]] + '</div>');
            }
        }  
    }
    
    // Rearrange cards on filter click
    $('[filter-type]').on('click', function(){
        rearrange_cards();
    });
    
    $('[select-filter-type]').change(function(){
        rearrange_cards();
    });
    
    $('[toggle-filter-type]').change(function(){
        rearrange_cards();
    });
    
    // Rearrange cards on page load (so the task remains consistent across tool sections once it is selected).
    rearrange_cards();
    */
    
    
    // PERSISTENT SHOWING NUMBER  
    /*if ($('.showing-results').length) {
        var showing_position = $('.results-title').offset();
        $(window).scroll(function () {
            if ($(window).scrollTop() > showing_position.top) {
                $('.results-title-wrapper').addClass('sticky');
                $('.filter-and-results-wrapper').addClass('sticky');
            } else {
                $('.results-title-wrapper').removeClass('sticky');
                $('.filter-and-results-wrapper').removeClass('sticky');
            }
        });
    } 
    */
    
    
    
    // SET FILTER MONTHS
    var date = new Date(),
        current_month = date.getMonth(),
        current_month_plus_1 =  date.getMonth() + 1,
        current_month_plus_2 =  date.getMonth() + 2,
        current_month_plus_3 =  date.getMonth() + 3,
        month_set = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        current_year = date.getFullYear();
 
    $('.current-month').text(month_set[current_month]);
    $('.current-month-plus-1').text(month_set[current_month_plus_1]);
    $('.current-month-plus-2').text(month_set[current_month_plus_2]);
    $('.current-month-plus-3').text(month_set[current_month_plus_3]);
    $('.current-year').text(current_year);
    
    
    
    // SESSIONS ACCORDIONS
    $('#sessions.accordion .accordion-item button').on('click', function(){
        console.log($(this));
        $(this).parents('.accordion-item').toggleClass('open');
        $(this).parents('.accordion-item').find('.accordion-body').slideToggle();
    });
    

    
    // DATEPICKER
	/*$('#datepicker .input-group.date').datepicker({
		format: "dd/mm/yyyy",
		autoclose: true,
		todayHighlight: true,
		weekStart: 1,
		container: '#datepicker-container',
		orientation: "bottom left"
	});*/
	/*$('.close-button').unbind();

	$('.close-button').click(function () {
		var common_ancestor = $(this).closest('.design-system-card');

		if ($('.datepicker').is(":visible")) {
			$('.date').datepicker('hide');

			common_ancestor.find('.state-selector label input').removeAttr('checked');
			common_ancestor.find('.default-label input').attr('checked', 'checked');
			$(this).closest(".example").attr('data-state', 'default-state');

		} else {
			$('.date').datepicker('show');

			common_ancestor.find('.state-selector label input').removeAttr('checked');
			common_ancestor.find('.focus-label input').attr('checked', 'checked');
			$(this).closest(".example").attr('data-state', 'focus-state');

		}
	});*/
    
   // OR TRY THE DATE RANGE - https://apps.bangor.ac.uk/static/intranet_project/bootstrap-daterangepicker/
    /*$('input[name="datefilter"]').daterangepicker({
      autoUpdateInput: false,
      locale: {
          cancelLabel: 'Clear'
      }
  });*/

  $('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
      $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
  });

  $('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
      $(this).val('');
  });
    
}); // END doc ready

