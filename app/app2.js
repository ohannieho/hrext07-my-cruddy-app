/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
let arr = [];
let color;
let timeStamp;
_.flatten([JSON.parse(localStorage.getItem('notepad'))]).includes(null) ? arr = _.flatten([JSON.parse(localStorage.getItem('notepad'))]).slice(1) : arr = _.flatten([JSON.parse(localStorage.getItem('notepad'))]);
// let arr = _.flatten([JSON.parse(localStorage.getItem('notepad'))]);
const localNotes = {...localStorage}
function storedNotes(){
  arr.forEach(obj => { 
    if (obj !== null) {
      let $noteTitle = $(`<div class="note-title"> ${obj["title"]} </div>`);
      let $card = $(`<div class="card"></div>`);
      $card.css('background-color', obj["cardColor"]);
      $noteTitle.prependTo($card).append('<div class="note" data-keyValue="'+ obj["title"] +'">'+ obj["body"] +'</div>');
      $card.prependTo('.noteBoard');
      console.log(obj['cardColor']);
      if(obj['cardColor'] === ('white' || 'rgb(255, 255, 255)')){
        $card.css('border','1px solid rgba(0,0,0,0.2)');
      }
    }
  })
}
storedNotes();


  $('.btn-add').on('click', function(e){    
    let keyData = $('.input-key').val();
    let valueData = $('.input-value').val();
    timeStamp = new Date().toLocaleString();
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
    if(color === ('white' || 'rgb(255, 255, 255)')){
      $card.css('border', '1px solid rgba(0,0,0,0.2)');
    }

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
    // $('.card').css('border', 'none')
  });


//edit box card

let editText, editTitle, currentThis;
  $('.noteBoard').on('click', '.card', function(e){

    $('.edit-value').show();
    currentThis = this;
    color = $(this).css('background-color');
    $(this).hide();


    editText = e.currentTarget.lastChild.children["0"].innerText;
    editTitle = e.currentTarget.lastChild.children["0"].dataset.keyvalue;
    // $('.edit-value').empty()
    let $editText = $('.edit-value').val(editText);
    let $editTitle = $('.edit-key').val(editTitle);
    $('.box').css('background-color', color);
    $('#overlay').css('display', 'block');
    $('.box').css('display', 'flex');
    let createdOn;
    arr.forEach(obj => {
      if(obj['title'] === editTitle && obj['body'] === editText){
        createdOn = obj['time'];
      }
    })
    $('.box').prepend(`<div class='time'>Edited ${createdOn}</div>`);

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
    $('.time').empty();
    color = 'white';
    storedNotes();
  });


//update

  $('.btn-update').on('click', function(){
    let newTitle = $('.edit-key').val();
    let newText = $('.edit-value').val();
    timeStamp = new Date().toLocaleString();
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
    $('.time').empty();
  });

//removes overlay

  $('#overlay').on('click', function (){
    $('#overlay').css('display', 'none');
    $(currentThis).show();
    $('.box').hide();
    $('.time').empty();
    color = 'white'
  });

// clear storage

  $('.btn-clear').click(function(){
    localStorage.clear();
    arr = _.flatten([JSON.parse(localStorage.getItem('notepad'))]);
    $('.noteBoard').empty();
    color = white;
    storedNotes();
  });

// color change

  let currentBox;
  $('.btn-color').on('mouseenter', function(e){
    currentBox = e.currentTarget.parentElement.parentNode.className//currentTarget.parentElement.parentElement.className; 
    if(currentBox !== 'box'){
      $('.setColor').fadeIn(100).css('display', 'flex');
    }else {
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

//to change container form back to start;

  $(document).mouseup(function(e) {
    var container = $('.input-value')
     if (!container.is(e.target) && container.has(e.target).length === 0) 
    {
        container.hide();
        $('.input-key').attr('placeholder', 'Take a note...');
        //$('.setColor').css('top', '7%');
    }
    
  });

//expand textarea

  $("textarea").keyup(function(e) {
    $(this).height(30);
    $(this).height(this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth")));
});

//card hover
$('.noteBoard').on('mouseover', '.card', function(e){
  $(this).css('box-shadow', '2px 2px 2px rgba(0,0,0,0.5)');
});

$('.noteBoard').on('mouseleave', '.card', function(e){
  $(this).css('box-shadow', 'none');
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