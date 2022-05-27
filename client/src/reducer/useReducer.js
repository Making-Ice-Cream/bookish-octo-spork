export const initialState = {'Admin': null , 'Student': null , 'Teacher' : null , 'Parent':null};
export const reducer = (state,action) =>{
    console.log(action);
    if(action.type === 'USER')
    {
        if(action.payload.logged_in_as == 'Admin'){

            state.Admin = action.payload.state;
           

        }else if(action.payload.logged_in_as == 'Student'){
            console.log("hello");
            state.Student = action.payload.state;
            console.log(state);
            

        }else if(action.payload.logged_in_as == 'Teacher'){
            
            state.Teacher = action.payload.state;

        }else if(action.payload.logged_in_as == 'Parent'){
            
            state.Parent = action.payload.state;
        }
        
    }
    console.log(state);
    return state ;
}