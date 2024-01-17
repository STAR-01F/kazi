import { Button } from "@mui/material"
import PlusIcon from "../../../components/PlusIcon"


const AddJob = () => {

    return (
        <Button variant="outlined" startIcon={<PlusIcon />}>
            Add Job
        </Button>
    )

}

export default AddJob