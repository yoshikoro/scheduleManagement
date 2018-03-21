/**
*自分のカレンダーに予定を作成する関数
*
*
*/
function createMySchedule() {
  var cal = CalendarApp.getDefaultCalendar();
  var calName = cal.getName();
  var sh =  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sh.getDataRange().getValues();
  data.forEach(function(value,i){
    if(value[0] != calName || value[7] != ""){
      return;
    }
    var title = data[i][2];
    var date = data[i][1];
    var description = data[i][6];
    var location = data[i][5];
    var options = {description:description,location:location}
    var event = cal.createAllDayEvent(title, date, options);
    data[i][7] = event.getId();
    
  })
  sh.getDataRange().setValues(data);
  
}
/**
*ID指定の予定を取り消し等（予定）
*
*
*/

function getScheduleEventById(id){
  var sh =  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sh.getDataRange().getValues();
  var id = data[1][7];
  Logger.log(CalendarApp.getEventById(id).getTitle());
  

}
/**
*１日分の予定を書きだし
*
*
*/

function getScheduleEvents(){
  //var value = CalendarApp.getDefaultCalendar().getEvents(startTime, endTime)[];
  var sh =  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var startTime = new Date();
  var endTime = new Date(startTime.getFullYear(),startTime.getMonth(),startTime.getDate() + 1);
  var events = CalendarApp.getDefaultCalendar().getEvents(startTime, endTime);
  events.forEach(function(value){
    sh.appendRow([CalendarApp.getDefaultCalendar().getName(),
    Utilities.formatDate(value.getStartTime(), 'Asia/Tokyo', 'MM月dd日'),value.getTitle()]);
  })
  
}