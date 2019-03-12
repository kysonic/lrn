var store={
    //хранилище действий, сюда можно запихивать обьекты, функции, всё что душе угодно
    store:[],
    //позиция курсора
    count:0,
    //позицию курсора выше которой нельзя сдвинуться в redo
    maxcount:0,

    //сохраняем действие пользователя
    save:function(param){
        console.log('пользователь совершил действие: '+param);
        this.count++;
        this.maxcount=this.count;
        this.store[this.count]=param;
    },

    // откат (false - значит что откатывать некуда)
    undo:function(){
        if (this.count>1){
            this.count--;
            return this.store[this.count];
        } else throw new Error('There is no operations to undo');
    },

    // восстановление (false - значит что восстанавливать нечего, верхняя граница определяется по this.maxcount)
    redo:function(){
        if(this.count<this.maxcount){
            this.count++;
            return this.store[this.count];
        }
        else throw new Error('There is no operations to redo');
    }
}

console.log("false - значит что undo/redo не даст эфекта, в случае false нечего делать ненадо. В примере специально используются лишние undo и redo, для правдоподобной имитации пользователя" );
store.save('действие1');
store.save('действие2');
store.save('действие3');
store.save('действие4');

console.log('откат на '+store.undo());
console.log('откат на '+store.undo());
console.log('откат на '+store.undo());
console.log('откат на '+store.undo());

console.log('востановлено '+store.redo());
console.log('востановлено '+store.redo());
console.log('востановлено '+store.redo());
console.log('востановлено '+store.redo());
console.log('востановлено '+store.redo());
console.log('востановлено '+store.redo());


console.log('откат на '+store.undo());
console.log('откат на '+store.undo());

store.save('2-1 действие');
store.save('2-2 действие');
store.save('2-3 действие');
store.save('2-4 действие');
console.log('откат на '+store.undo());
console.log('откат на '+store.undo());

console.log('востановлено '+store.redo());
console.log('востановлено '+store.redo());
