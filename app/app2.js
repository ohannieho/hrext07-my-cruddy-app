/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
let arr = [];
let color;

_.flatten([JSON.parse(localStorage.getItem('notepad'))]).includes(null) ? arr = _.flatten([JSON.parse(localStorage.getItem('notepad'))]).slice(1) : arr = _.flatten([JSON.parse(localStorage.getItem('notepad'))]);
// let arr = _.flatten([JSON.parse(localStorage.getItem('notepad'))]);
console.log(arr);
const localNotes = {...localStorage}
function storedNotes(){
  arr.forEach(obj => { 
    if (obj !== null) {
      let $noteTitle = $(`<div class="note-title"> ${obj["title"]} </div>`);
      let $card = $(`<div class="card"></div>`);
      $card.css('background-color', obj["cardColor"]);
      $noteTitle.prependTo($card).append('<div class="note" data-keyValue="'+ obj["title"] +'">'+ obj["body"] +'</div>');
      $card.prependTo('.noteBoard');
    }
  })
}
storedNotes();


  $('.btn-add').on('click', function(e){
    //console.log(e);
    
    let keyData = $('.input-key').val();
    let valueData = $('.input-value').val();
    let timeStamp = new Date();
    if(color === undefined){
      color = 'white';
    }
    // write to db
    arr.push( {title: keyData, body: valueData, time: timeStamp, cardColor: color} );
    console.log(arr);
    localStorage.setItem('notepad', JSON.stringify(arr));
    // read from db

    let $card = $(`<div class="card"></div>`);
    $card.css('background-color', color);
    $noteTitle = $(`<div class="note-title"> ${keyData} </div>`)
    $noteTitle.prependTo($card).append('<div class="note" data-keyValue="'+ keyData +'">'+valueData+'</div>');

    $('.input-key').val('');
    $('.input-value').val('');
    $('.input-value').hide();
    $('.input-key').attr('placeholder', 'Take a note...');
    $card.prependTo('.noteBoard');
    //need to be able to select note card and be able to edit that note card
    //need to make an add note card button
    $('.container-form').css('background-color', 'white');
    color = 'white';
  });


//edit box
let editText, editTitle, currentThis;
  $('.noteBoard').on('click', '.card', function(e){
    //console.log(e);
    $('.edit-value').show();
    currentThis = this;
    color = $(this).css('background-color');
    $(this).hide();
    // $(this).css()

    editText = e.currentTarget.lastChild.children["0"].innerText;
    editTitle = e.currentTarget.lastChild.children["0"].dataset.keyvalue;
    // $('.edit-value').empty()
    let $editText = $('.edit-value').val(editText);
    let $editTitle = $('.edit-key').val(editTitle);
    $('.box').css('background-color', color);
    // $('#color-box').css('top', '42%');
    $('#overlay').css('display', 'block');
    $('.box').show();

    //what if i get that exact card to pop out instead of a box


  });
  

//delete item

  $('.btn-delete').on('click', function(){
    var arrDel = arr.filter(obj => obj["title"] !== editTitle)
    localStorage.setItem('notepad', JSON.stringify(arrDel));
    arr = _.flatten([JSON.parse(localStorage.getItem('notepad'))]);
    $('#overlay').css('display', 'none');
    $('.box').hide();
    $('.noteBoard').empty();
    storedNotes();
  });

//update
  $('.btn-update').on('click', function(){
    let newTitle = $('.edit-key').val();
    let newText = $('.edit-value').val();
    let timeStamp = new Date();
    var arrUpdate = arr.map((obj)  => {
      if (editTitle === obj["title"]) {
        return ({title: newTitle, body: newText, time: timeStamp, cardColor: color});
      }else {
        return obj;
      }
    })
    localStorage.setItem('notepad', JSON.stringify(arrUpdate));
    arr = _.flatten([JSON.parse(localStorage.getItem('notepad'))]);
    $('#overlay').css('display', 'none');
    $('.box').hide();
    $('.noteBoard').empty();
    storedNotes();
    color = 'white';
  });

//removes overlay
  $('#overlay').on('click', function (){
    $('#overlay').css('display', 'none');
    $(currentThis).show();
    $('.box').hide();

  });

// clear storage
  $('.btn-clear').click(function(){
    localStorage.clear();
    arr = _.flatten([JSON.parse(localStorage.getItem('notepad'))]);
    $('.noteBoard').empty();
    storedNotes();
  });

// color change
  let currentBox;
  $('.btn-color').on('mouseenter', function(e){
    currentBox = e.currentTarget.parentElement.parentNode.className//currentTarget.parentElement.parentElement.className;
    console.log('btncolor ' + currentBox);
    if(currentBox !== 'box'){
      $('.setColor').fadeIn(100).css('display', 'flex');
    }else {
     // $('.editColor').css('top', '40%');
      $('.editColor').fadeIn(100).css('display', 'flex');
    }
  });

  $('.btn-color').on('mouseleave', function(){
    $('#color-box').fadeOut();
    $('.editColor').fadeOut();
  });

  $(".color").on('click', function() { 
      color = $(this).css('background-color');
      console.log('color ' + currentBox);
      $(`.${currentBox}`).css('background-color', color);
  });

  $('.list-view').on('click', function() {
    $('.noteBoard').css('flex-direction', 'column');
    $('.card').css('width', '500px');
    $('.list-view').hide();
    $('.grid-view').show();
  });

  $('.grid-view').on('click', function() {
    $('.noteBoard').css('flex-direction', 'row');
    $('.card').css('width', '250px');
    $('.list-view').show();
    $('.grid-view').hide();
  });

  $('.input-key').on('click', function() {
    $('.input-value').show();
    $('.input-key').attr('placeholder', 'Title');
    //$('.setColor').css('top', '12%');
  });

  $(document).mouseup(function(e) {
    var container = $('.input-value')
     if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.hide();
        $('.input-key').attr('placeholder', 'Take a note...');
        //$('.setColor').css('top', '7%');
    }
    
  });

  $("textarea").keyup(function(e) {
    $(this).height(30);
    $(this).height(this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth")));
});

  //uncross line
  //  $('.container-data').on('click', '.note', function(e){
  //   // console.log(e.currentTarget);
  //   var keyData = e.currentTarget.dataset.keyvalue;
  //   $('.note').css("text-decoration", "none");
  //   //localStorage.removeItem(keyData);
  //   // $('.container-data').text('');
  // });



});