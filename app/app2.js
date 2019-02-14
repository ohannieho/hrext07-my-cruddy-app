/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
let arr = [];
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

let color;
  $('.btn-add').on('click', function(e){
    //console.log(e);
    
    let keyData = $('.input-key').val();
    let valueData = $('.input-value').val();
    let timeStamp = new Date();
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
    $card.prependTo('.noteBoard');
    //need to be able to select note card and be able to edit that note card
    //need to make an add note card button

  });


//edit box
let editText, editTitle;
  $('.noteBoard').on('click', '.card', function(e){
    console.log(e);
    // console.log(this);
    // $(this).css('background-color', 'red');
    // $(this).css()

    editText = e.currentTarget.lastChild.children["0"].innerText;
    editTitle = e.currentTarget.lastChild.children["0"].dataset.keyvalue;
    $('.edit-value').empty()
    let $editText = $('.edit-value').val(editText);
    let $editTitle = $('.edit-key').val(editTitle);
    
    $('#color-box').css('top', '42%');
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
  })

//update
  $('.btn-update').on('click', function(){
    let newTitle = $('.edit-key').val();
    let newText = $('.edit-value').val();
    let timeStamp = new Date();
    var arrUpdate = arr.map((obj)  => {
      if (editTitle === obj["title"]) {
        console.log('hello');
        return ({title: newTitle, body: newText, time: timeStamp});
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
  })

//removes overlay
  $('#overlay').on('click', function (){
    $('#overlay').css('display', 'none');
    $('.box').hide();
    $('#color-box').css('top', '12%');

  })

// clear storage
  $('.btn-clear').click(function(){
    localStorage.clear();
    arr = _.flatten([JSON.parse(localStorage.getItem('notepad'))]);
    $('.noteBoard').empty();
    storedNotes();
  });

// color change
  $('.btn-color').on('mouseenter', function(){
    $('#color-box').fadeIn(100).css('display', 'flex');
  })
  $('.btn-color').on('mouseleave', function(){
    $('#color-box').fadeOut(150);
  })

  $(".color").on('click', function(e) { 
      color = $(this).css('background-color');
      // console.log(color);
      console.log(e)
      $('.container-form').css('background-color', color);
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