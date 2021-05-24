function add_field()
{
  var total_text=document.getElementsByClassName("input_text");
  total_text=total_text.length+1;
  document.getElementById("field_div").innerHTML=document.getElementById("field_div").innerHTML+
  "<p id='input_text"+total_text+"_wrapper'>"+
 	"<input type='text' class='input_text' id='input_textA"+total_text+"' placeholder='From'>"+
 	"<input type='text' class='input_text' id='input_textB"+total_text+"' placeholder='To'>"+
 	"<input type='text' class='input_text' id='input_textC"+total_text+"' placeholder='Length'>"+
 	"<input type='text' class='input_text' id='input_textD"+total_text+"' placeholder='Maintainence Cost'>"+
 	"<input type='button' value='Remove' onclick=remove_field('input_text"+total_text+"');></p>";
}
function remove_field(id)
{
  document.getElementById(id+"_wrapper").innerHTML="";
}
