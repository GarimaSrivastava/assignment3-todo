var StatusEnums={
    ACTIVE : "ACTIVE",
    COMPLETE : "COMPLETE",
    DELETED : "DELETED"
}

var todos={
    1: {title : "Learn JS" , status : StatusEnums.ACTIVE},
    2: {title : "Learn C#" , status : StatusEnums.ACTIVE},
    3: {title : "Make Assignment" , status : StatusEnums.ACTIVE},
    4: {title : "Upload Assignment" , status : StatusEnums.ACTIVE},
    5: {title : "Practice Guitar" , status : StatusEnums.ACTIVE}
}

var next_todo_id = 6;

module.exports =
    {
        StatusEnum : StatusEnums,
        todos : todos,
        next_todo_id : next_todo_id
    }

