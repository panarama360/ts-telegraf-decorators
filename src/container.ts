export type Container = { get<T>(someClass: { new (...args: any[]): T }|Function): T, set<T>(someClass: { new (...args: any[]): T }, instance: T) }
let userContainer : Container;

export function useContainer(iocContainer: { get(someClass: any): any , set(someClass: any, instance: any)}) {
    userContainer = iocContainer;
}

const defaultContainer: Container = new (class{

    private instances: { type: Function, object: any }[] = [];
    get<T>(someClass: { new (...args: any[]): T }): T {
        // @ts-ignore
        let instance = this.instances.find(instance => instance.type === someClass);
        if (!instance) {
            instance = { type: someClass, object: new someClass() };
            this.instances.push(instance);
        }

        return instance.object;
    }
    set<T>(someClass: { new (...args: any[]): T }, instance: T){
        this.instances.push({type: someClass, object: instance})
    }
})()

export function getFromContainer<T>(someClass: { new (...args: any[]): T }|Function): T {
    if (userContainer) {
        try {
            const instance = userContainer.get(someClass);
            if (instance)
                return instance;
        } catch (error) {
            throw error;
        }
    }
    return defaultContainer.get<T>(someClass);
}

export function getContainer(){
    if (userContainer) {
        return userContainer;
    }
    return defaultContainer;
}