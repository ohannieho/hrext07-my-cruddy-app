/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  // this is where we jquery
  //var keyData = 'ourKey'; // going to need to make this dynamic?
//$('.container-data').append('<div class="note">' + localStorage.getItem() + '</div>');
//[{title:, note:, time: }, ...]
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
    // write to db
    // let arrAdd = [];
    arr.push( {title: keyData, body: valueData, time: timeStamp} );
    console.log(arr);
    localStorage.setItem('notepad', JSON.stringify(arr));
    // read from db
    // var displayText = keyData + ' | ' + localStorage.getItem(keyData);
    
    // this only displays the last one? might want to switch to html
    // and append a div
    // <div class="display-data-item" data-keyValue="keyData">valueData</div>
    // if you use backticks ` you can use ${templateLiterals}
    // TODO make this vars make sense across the app
    let $card = $(`<div class="card"></div>`);
    $noteTitle = $(`<div class="note-title"> ${keyData} </div>`)
    $noteTitle.prependTo($card).append('<div class="note" data-keyValue="'+ keyData +'">'+valueData+'</div>');

    $('.input-key').val('');
    $('.input-value').val('');
    $card.prependTo('.noteBoard');
    //need to be able to select note card and be able to edit that note card
    //need to make an add note card button

  });


  // update db
    // need to expand when  more than 1 item is added

//edit box
let editText, editTitle;
  $('.noteBoard').on('click', '.card', function(e){
    //console.log(e);
    editText = e.currentTarget.lastChild.children["0"].innerText;
    editTitle = e.currentTarget.lastChild.children["0"].dataset.keyvalue;
    //var $editText = $(`<textarea type="text" class="edit-value">${editText}</textarea>`);
    $('.edit-value').empty()
    let $editText = $('.edit-value').text(editText);
    let $editTitle = $('.edit-key').val(editTitle);
    $('#overlay').css('display', 'block');
    // $editTitle.prependTo('.box').prepend($editText);
    $('.box').show();
    // var keyData = e.currentTarget.dataset.keyvalue;
    // $(keyData).css("text-decoration", "line-through");

    //localStorage.removeItem(keyData);
    // $('.container-data').text('');
  });
  

//delete item

  $('.btn-delete').on('click', function(){
    var arrDel = arr.filter(obj => obj["title"] !== editTitle)
    localStorage.setItem('notepad', JSON.stringify(arrDel));
    arr = _.flatten([JSON.parse(localStorage.getItem('notepad'))]);
    $('.noteBoard').empty();
    storedNotes();
  })

//update
  $('.btn-update').on('click', function(){
    //console.log('works');
    let newTitle = $('.edit-key').val();
    let newText = $('.edit-value').val();
    let timeStamp = new Date();
    // localStorage.removeItem(editTitle);
    // localStorage.setItem(newTitle, newText);
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
    $('.noteBoard').empty();
    storedNotes();
  })

//removes overlay
  $('#overlay').on('click', function (){
    $('#overlay').css('display', 'none');
    $('.box').hide();

  })
  //uncross line
  //  $('.container-data').on('click', '.note', function(e){
  //   // console.log(e.currentTarget);
  //   var keyData = e.currentTarget.dataset.keyvalue;
  //   $('.note').css("text-decoration", "none");
  //   //localStorage.removeItem(keyData);
  //   // $('.container-data').text('');
  // });

  // delete all?
  $('.btn-clear').click(function(){
    localStorage.clear();
    $('.container-data').text('');
  });

});