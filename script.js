const fields = ['day','month','year']; 
const errors = [
    'This Field is required', 
    'Must be in the past',
    'Must be a valid month',
    'Must be a valid day',
    'Must be a valid date'];
const validateFields = ({day, month, year}) => {

    let dayNow = new Date().getDate();
    let monthNow = new Date().getMonth()+1;
    let yearNow = new Date().getFullYear();
    let myinputs = document.querySelectorAll('.input-number');

    cleanFields(fields);

    // checking fields empty
    if ( day === ''){
        labelErrors(fields[0],errors[0]);
    }
    if ( month === ''){
        labelErrors(fields[1],errors[0]);
    }
    if ( year === ''){
        labelErrors(fields[2],errors[0]);
    }
    if( document.body.getElementsByClassName("lblError").length > 0 ){
        myinputs.forEach(myinput => {
            myinput.parentElement.classList.add("error-input");
        });
        return false;
    }  
    
    // checking valid year
    if (yearNow < Number(year)){
        labelErrors(fields[2],errors[1]);
    }
    // checking valid month
    if ( Number(month) < 1 || Number(month) > 12 ){
        labelErrors(fields[1],errors[2]);
    } 
    // checking valid day
    if ( Number(day) < 1 || Number(day) > new Date(year, month, 0).getDate() ){
        labelErrors(fields[0],errors[3]);
    }


    if( document.body.getElementsByClassName("lblError").length > 0 ){
        myinputs.forEach(myinput => {
            myinput.parentElement.classList.add("error-input");
        });
        return false;
    }
    
    // ckeking date is less than now
    if((Number(month) > monthNow || Number(day) >= dayNow) && yearNow === Number(year) ){
        labelErrors( fields[0], errors[4] );
        document.getElementById(`lbl-${fields[1]}`).classList.add("error");
        document.getElementById(`lbl-${fields[2]}`).classList.add("error");
        
    }
    if( document.body.getElementsByClassName("lblError").length > 0 ){
        myinputs.forEach(myinput => {
            myinput.parentElement.classList.add("error-input");
        });
        return false;
    }

    return true;
    
}

const cleanFields = ( fields ) => {

    let myinputs = document.querySelectorAll('.input-number');
    myinputs.forEach(myinput => {
        myinput.parentElement.classList.remove("error-input");
    });

    fields.map( field =>{
        const divField = document.getElementById(`control-${field}`);
        if( !! document.getElementById(`lblError-${field}`)){
            const lblError = document.getElementById(`lblError-${field}`);
            divField.removeChild(lblError);
        }
        document.getElementById(`lbl-${field}`).classList.remove("error");
        return field;
    })
}

const labelErrors = (field, error) => {

    const divField = document.getElementById(`control-${field}`);
    document.getElementById(`lbl-${field}`).classList.add("error");
    const lblError = document.createElement('label');
    lblError.className="lblError"
    lblError.id=`lblError-${field}`;
    lblError.innerHTML= error;
    divField.append(lblError);

} 

const numDays = (dateStart, dateEnd) =>{
    let arrayDateStart = dateStart.split('/'); 
    let arrayDateEnd = dateEnd.split('/'); 
    let msegDateStart = Date.UTC(arrayDateStart[2], arrayDateStart[1]-1, arrayDateStart[0]); 
    let msegDateEnd = Date.UTC(arrayDateEnd[2], arrayDateEnd[1]-1, arrayDateEnd[0]); 
    let diff = msegDateEnd - msegDateStart;
    let days = Math.floor(diff / (1000 * 60 * 60 * 24)); 
    return days;
}

const daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}
function sumDaysToDate(numDays, date){
    var arrayDate = date.split('/');
    var newDate = new Date(arrayDate[2]+'/'+arrayDate[1]+'/'+arrayDate[0]);
    newDate.setDate(newDate.getDate()+parseInt(numDays));        
    return newDate.getDate() + '/' + (newDate.getMonth()+1) + '/'+ newDate.getFullYear();
}

const startCount = (result, span) => {
    let counter = 0;
    if  (result === 0){
        span.textContent = 0;
    }else{
        let interval = setInterval(()=>{
            counter++
            if ( counter === result ){
                clearInterval(interval)
            }
            span.textContent = counter;
        },80);
    }
}

const onClickEvent = ( event ) => {

    const day = document.getElementById("day").value;
    const month = document.getElementById("month").value;
    const year = document.getElementById("year").value;
    let daysCal = 0;
    let cantDays = 0;
    let cantMonths = 0;
    let cantYears = 0;
    let spans = [ document.querySelector('#spanYear'), document.querySelector('#spanMonth'),document.querySelector('#spanDay')];

    if(validateFields({day, month, year})){
        let dateEnd = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`;
        let dateStart = `${ day }/${ month }/${year}` ;      
        let nDaysTotal = numDays(dateStart, dateEnd);
        while(daysCal < nDaysTotal){
            var arrayDateStart = dateStart.split('/');
            var daysOfMonth = daysInMonth(arrayDateStart[1], arrayDateStart[2]);
            daysCal = daysCal + daysOfMonth;
            if(daysCal <= nDaysTotal){
           cantMonths ++;
           if(cantMonths == 12){
              cantYears++;
              cantMonths = cantMonths - 12;
           }
           }else{
              cantDays = Math.abs(numDays(dateStart, dateEnd));
           }
           dateStart = sumDaysToDate(daysOfMonth, dateStart);
       }
       let result = [ cantYears, cantMonths, cantDays];

       for (let res = 0; res < result.length; res++) {
        startCount( result[res], spans[res] )        
       }
       

    };
    
}