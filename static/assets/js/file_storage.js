
$('.delete_button').click(function(){
var file = $(this).val();
       $.ajax({
            url: "delete_file_strd",
            type: "post",
            data: {'file':file},
            success: (result) => {
                if (!result.success) {
                    alert(result.message);
                }
                else {
                    console.log('Success')
                    location.reload();
                }
            },
            error: (XMLHttpRequest, textStatus, errorThrown) => {
                alert(errorThrown + "\nContact your database administrator.\nStatus: " + textStatus);
            }
        });

})


$('.inner_category').click(function(){
if ($(this).val() == 'all'){
$('.all_files').css('display','block')
}
else{
var classes = $('.all_files');
for(var i = 0; i < classes.length; i++)
{
   var in_element = classes[i].classList
   var inner_class = in_element
    var n = inner_class['value'].includes($(this).val())
    if(n == false){
    $('#'+classes[i].id).css('display','none')
    }
    if(n == true){
    console.log(classes[i].id)
    $('#'+classes[i].id).css('display','block')
    document.getElementById(classes[i].id).style.display = "block";
    }
}
}
}
)


function upload_files(){
console.log('here')
console.log($('#main_dep').val())
console.log($('#sec_dep').val())
    var form_data = new FormData();
    form_data.append('main_dep', $('#main_dep').val());
    form_data.append('sec_dep', $('#sec_dep').val());
    form_data.append('file', $('#up_files').prop('files')[0]);

console.log(form_data)
    $(function() {
    $.ajax({
        type: 'POST',
        url:  '/fileUploader',
        data: form_data,
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
            console.log('Success!');
            $('#close_model_box').click()
        },
    });
    });
}
function upload_files_into_folder(){
console.log('here')
    var form_data = new FormData();
    form_data.append('file', $('#up_files_folder').prop('files')[0]);
    form_data.append('folder_name', $('#folder_name').val());
console.log(form_data)
    $(function() {
    $.ajax({
        type: 'POST',
        url:  '/fileUploader_to_folder',
        data: form_data,
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
            console.log('Success!');
            $('#close_model_box').click()
            location.reload();
        },
    });
    });

}

function cat_selected(text){


if (text != 'all'){
$('.cat_tr').hide()
$('.'+text.toLowerCase()).show()
$('#cat_show').text(" "+text)
if (text == 'M_and_P'){$('#cat_show').text(" "+'M&P')}
if (text == 'Ancillary_Equipment'){$('#cat_show').text(" "+'Ancillary Equipment')}
}else{
$('.cat_tr').show()
$('#cat_show').text(' All Files')
}
}

function create_folder(){
    var form_data = new FormData();
    form_data.append('folder_name', $('#folder_name').val());
    form_data.append('main_dep', $('#main_dep_f').val());
    form_data.append('sec_dep', $('#sec_dep_f').val());
    console.log(form_data)
    $(function() {
    $.ajax({
        type: 'POST',
        url:  '/create_folder',
        data: form_data,
        contentType: false,
        cache: false,
        processData: false,
        success: function(data) {
            console.log('Success!');
            $('#close_create_folder_box').click()
        },
    });
    });


}

$('#delete_list').click(function(){
var list = $('.delete_list')
var list_to_delete = {}
for (var i = 0; i < list.length; i++) {
var elem = list[i]
if (elem.checked == true){
list_to_delete[i] = elem.value
}
}
    $.ajax({
        type: 'POST',
        url:  '/delete_files',
        data: {'data':list_to_delete},
        success: function(data) {
            if (data.success = true){
            console.log('Success!');
            location.reload();
            }
        },
    });

})