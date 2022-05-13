const success = (message) => console.log("✅:" + message)

export class Test {
    static count = 0

    constructor(name: string, run: (fail: (message: string) => void) =>  void) {
        Test.count++
        const fail = ( message) => { throw new Error("❌:" + name + ":" + message) }
        try {
            run(fail)
            success(name)
        } catch(exception) {
            fail(exception.message)
        }
    } 
}