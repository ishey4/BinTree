"use strict"


var a;

$('document').ready(function () {
    
    a = new BST({ value: 50 }) //create the Root node

    $('.Tree').html(a.html.html); //create the Root node

    //adding some random items..
    for (var i = 0; i < 10; i++) { a.addElementClick();}

    $(window).resize(function () {a.reSizeRoot() })//lets keep it neat!!!
    $('body').on('click', '.DisplayName', find)    // biding click for the remove.
});

    function find() {
        var value = $(event.target).html();
        var id = $(event.target).attr('nodeid')
        var nd = a.findNode(value, id, a);
        if (!nd) { alert('nodeNot Found!') };
        a.removeNode(nd);
    }



