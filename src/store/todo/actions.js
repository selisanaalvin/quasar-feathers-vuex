
export function insertTodo (context,data) {
    const todo = {
        desc: data,
        isDone:false
    }    
    context.commit('insertMutation',todo)
}

export function deleteTodo (context,data) {
    context.commit('deleteMutation',data)
}

export function updateTodo (context,data) {
    context.commit('updateMutation',data)

}