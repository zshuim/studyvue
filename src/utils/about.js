// 当选中节点变化时触发
/**
 * 
 */
function deptChange() {
    if (this.$refs.deptRef.checkedValue.length === 0) {
        this.arr_selectedOptions = [];
        this.str_selectedOptions = "";
    }
    else {

    }
}
