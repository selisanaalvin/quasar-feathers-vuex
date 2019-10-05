export function insertMutation (state,data) {
    state.Todos.push(data)
}

export function deleteMutation (state,data) {
    const loc = state.Todos.findIndex(dt => dt.desc === data)
    state.Todos.splice(loc,1)
}

export function updateMutation (state,data) {
    const loc = state.Todos.findIndex(dt => dt.desc === data.desc)
    state.Todos.splice(loc,1,{desc:data.desc,isDone:!data.isDone})
}