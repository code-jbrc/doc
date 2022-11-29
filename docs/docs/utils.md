## chainFn 函数

### source code
```ts
type ExecutorFn = (...args: any) => any;

const flat = (arr: any[], num = 1) => {
    let i = 0;
    while (arr.some((item) => Array.isArray(item))) {
        arr = [].concat(...arr);
        i++;
        if (i >= num) break;
    }
    return arr;
};

export class ChainFn {
    resList: any[];
    executorList: any[];
    errorList: any[];

    constructor(executor?: ExecutorFn, args?: any, resList: any[] = [], executorList: any[] = [], errorList: any[] = []) {
        this.resList = resList;
        this.executorList = executorList;
        this.errorList = errorList;
        args = flat([args]);

        // 添加执行函数
        executor && this.executorList.push([executor, args]);
    }

    public add(onResFn: ExecutorFn, args?: any) {
        args = flat([args]);
        return new ChainFn(onResFn, args, this.resList, this.executorList, this.errorList);
    }

    private async executeSync(executor: Function, args: any[]) {
        return executor instanceof Promise ? await (executor as any).apply(this, args) : executor.apply(this, args);
    }

    public async run(onResFn?: Function, args?: any): Promise<ChainFn> {
        await this.getValue();
        args = flat([args]);

        if (onResFn) {
            try {
                const returnValue = await this.executeSync(onResFn, [this.resList, ...args]);
                returnValue && this.resList.push(returnValue);
            } catch (error) {
                this.errorList.push(error);
            }
        }

        return new ChainFn(undefined, undefined, this.resList, this.executorList, this.errorList);
    }

    public clear() {
        return new ChainFn(undefined, undefined, [], [], []);
    }

    public async get(allRes = false): Promise<any> {
        await this.getValue();
        this.resList  = this.resList.filter(v => v);
        return allRes ? this.resList : this.resList[this.resList.length-1];
    }

    private async getValue() {
        for (let index = 0; index < this.executorList.length; index++) {
            const [executor, args, isDo = false] = this.executorList[index];
            const useRes = executor.name === '' ? true : false;
            
            if (isDo)
                continue;
            try {
                const value = useRes ? await this.executeSync(executor, [this.resList]) : await this.executeSync(executor, args);
                this.resList.push(value);
                this.executorList[index].push(true);
            } catch (error) {
                this.errorList.push(error);
            }
        }
    }

    public catch(callBack: Function) {
        if (this.errorList.length) {
            return callBack.apply(this, this.errorList);
        }
    }
}
```

### template
```ts
console.log(await new ChainFn()
    .add(say, ['2', 2])
    .add(say, '3')
    .add(say, '4')
    .add(say, '5')
    .add(say, '6')
    .add((res) => {
        console.log(res, '获取前方的结果');
        
        return say('7');
    })
    .get(), '最后的结果');
/**
 *  2
 *  3
 *  4
 *  5
 *  6
 *  [ '2', '3', '4', '5', '6' ] 获取前方的结果
 *  7
 *  7 最后的结果
 */
```