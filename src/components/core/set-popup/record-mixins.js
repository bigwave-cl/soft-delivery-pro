/*
 * @Author: askMeWhy
 * @Date:   2017-11-22 10:20:00
 * @Last Modified by:   bigWave
 * @Last Modified time: 2017-12-04 12:00:18
 */
export default {
	data() {
		return {
			types: [
				{
					id: -1,
					value: '查看全部',
				},
			    {
					id: [1, 2],
					value: 'APP蓝牙操作'
				},
				{
					id: 3,
					value: 'APP远程操作'
				},
				{
					id: 4,
					value: '本地操作'
				},
				{
					id: 5,
					value: 'PC端远程操作'
				},
				{
					id: 6,
					value: 'Web远程操作'
				}
			],
			actions: [{
					id: 0,
					value: "登录"
				},
				{
					id: 1,
					value: "开箱"
				},
				{
					id: 2,
					value: "开布防"
				},
				{
					id: 3,
					value: "关布防"
				},
				{
					id: 4,
					value: "更改布防灵敏度高"
				},
				{
					id: 5,
					value: "更改布防灵敏度中"
				},
				{
					id: 6,
					value: "更改布防灵敏度低"
				},
				{
					id: 7,
					value: "开离位"
				},
				{
					id: 8,
					value: "关离位"
				},
				{
					id: 9,
					value: "更改报警范围高"
				},
				{
					id: 10,
					value: "更改报警范围中"
				},
				{
					id: 11,
					value: "更改报警范围低"
				},
				{
					id: 12,
					value: "更改位置报送间隔高"
				},
				{
					id: 13,
					value: "更改位置报送间隔中"
				},
				{
					id: 14,
					value: "更改位置报送间隔低"
				},
				{
					id: 15,
					value: "更改报警报送间隔高"
				},
				{
					id: 16,
					value: "更改报警报送间隔中"
				},
				{
					id: 17,
					value: "更改报警报送间隔低"
				},
				{
					id: 18,
					value: "添加物品"
				},
				{
					id: 19,
					value: "删除物品"
				},
				{
					id: 20,
					value: "开启远程授权"
				},
				{
					id: 21,
					value: "关闭远程授权"
				},
				{
					id: 22,
					value: "添加区域锁定"
				},
				{
					id: 23,
					value: "删除区域锁定"
				},
				{
					id: 24,
					value: "添加时间锁定"
				},
				{
					id: 25,
					value: "删除时间锁定"
				},
				{
					id: 26,
					value: "开启手动锁定"
				},
				{
					id: 27,
					value: "关闭手动锁定"
				}
			]
		}
	},
	methods:{
		buildType(id){
			let _type = {
				id: -1,
				value: '未知'
			};
			this.types.map(index=>{
				if(index.id.length != void 0 && index.id.length>0){
					let _r = index.id.filter(sub=>sub == id);
					if(_r.length != 0){
						_type = index;
					}
				}else{
					if(index.id == id){
						_type = index;
					}
				}
			})
			return _type;
		},
		buildAction(id){
			let _action = {
				id: -1,
				value:'未知'
			};
			this.actions.map(index=>{
				if(index.id == id){
					_action = index;
				}
			})
			return _action;
		}
	}
}
