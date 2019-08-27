 $(window).load(function(){
      
	$(document).ready(function () {
	    var gridClass = $('.table');
	    // counts total number of td in a head so that we can can use it for label extraction
	    var head_col_count = $(gridClass).find('tbody th').size();
	
	    // loop which replaces td
	    for (i = 0; i <= head_col_count; i++) {
	        // head column label extraction
	        var head_col_label = $(gridClass).find('tbody th:nth-child(' + i + ')').text();
	        // replaces td with <div class="column" data-label="label">
	        $(gridClass).find('tr td:nth-child(' + i + ')').replaceWith(function () {
	            return $('<div class="column" data-label="' + head_col_label + '">').append($(this).contents());
	        });
	    }
	    // replaces table with <div class="table">
	    $(gridClass).replaceWith(function () {
	        return $('<div class="div-table">').append($(this).contents());
	    });
	
	    // replaces thead with <div class="table-head">
	    $('.div-table tbody tr:first-child').replaceWith(function () {
	        return $('<div class="table-head">').append($(this).contents());
	    });
	    // replaces tbody with <div class="table-container">
	    $('.div-table tbody').replaceWith(function () {
	        return $('<div class="table-container">').append($(this).contents());
	    });
	    // replaces tr with <div class="table-row">
	    $('.div-table tr').replaceWith(function () {
	        return $('<div class="table-row">').append($(this).contents());
	    });
	    // replaces th with <div class="column">
	    $('.div-table th').replaceWith(function () {
	        return $('<div class="column">').append($(this).contents());
	    });
	});

  });