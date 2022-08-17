import Amazon from "../public/amazon.png"

class FakeClient {
    static stages = {}
    static unusedJobs = []

    static setStage = (stageList) => {
        this.stages = {}
        for (const stage of stageList) {
            this.stages[stage] = []
        }
        this.printStatus()
    }

    static deleteStage (stage) {
        delete this.stages[stage]
        this.printStatus()
    }

    static addStage (stage) {
        this.stages[stage] = []
        this.printStatus()
    }

    static editStage (stage, newVal) {
        this.stages[stage] = newVal
        this.printStatus()
    }

    static getStage (stage) {
        this.printStatus()
        return this.stages[stage] ?? []
    }

    static printStatus() {
        console.log(this.stages)
    }

    static searchUnusedJobs(str) {
        return this.unusedJobs.filter(elem => elem[0].includes(str) || elem[2].includes(str))
    }

    static setUnusedJobs(jobs) {
        this.unusedJobs = jobs
    }

    static removeUnusedJobs(id) {
        this.unusedJobs = this.unusedJobs.filter(elem => elem["id"] != id)
    }

    static getUnusedJobs() { 
        return this.unusedJobs;
    }
}

export default FakeClient