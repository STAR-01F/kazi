import { Button } from "@mui/material"
import PlusIcon from "../../../components/PlusIcon"

type AddJobProps = {
    handleClickOpen?: ()=> void
}
const AddJob = ({handleClickOpen}:AddJobProps) => {

    return (
        <Button onClick={handleClickOpen} variant="outlined" startIcon={<PlusIcon />}>
            Add Job
        </Button>
    )

}

export default AddJob