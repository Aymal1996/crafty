"use client"

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Star} from 'lucide-react'

export default function StarRating({totalStars= 5, initialRating = 0, onChange}){
    const [rating, setRating] = useState(initialRating);
    const [hover, setHover] = useState(0);

    const handleRating = (currentRating) =>{
        setRating(currentRating);
        if(onChange){
            onChange(currentRating);
        }
    }

    return (
        <div className='flex items-center space-x-1'>
            {[...Array(totalStars)].map((_, index) => {
                const currentRating = index + 1;
                return(
                    <Button
                    key={index}
                    variant="ghost"
                    size='sm'
                    className={`p-0 ${currentRating <= (hover || rating) ? "text-yellow-400": "text-gray-500"}`}
                    onClick={()=> handleRating(currentRating)}
                    onMouseEnter={()=> setHover(currentRating)}
                    onMouseLeave={()=> setHover(0)}
                    >
                        <Star className='h-6 w-6 fill-current'/>
                    </Button>
                )
            })}
        </div>
    )
}