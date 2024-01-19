import { Skeleton } from '@mui/material';

const SkeletonChip = ({ size }: { size: number }) => {
    return (
        <Skeleton
            component={'div'}
            variant='rectangular'
            width={`${size}%`}
            sx={{ borderRadius: '16px' }} // Add this line
        />
    );
};

export default SkeletonChip;
