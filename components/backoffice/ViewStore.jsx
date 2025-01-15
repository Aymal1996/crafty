import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import {formData} from '@/components/backoffice/EditStoreForm'


const ViewStore = () => {
    
    const storeData = {
        name: 'John Doe',
        email: 'email@gmail.com'
    }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <p className="text-lg">{storeData.name}</p>
          </div>
          <div>
            <Label>Email</Label>
            <p className="text-lg">{storeData.email}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Store Name</Label>
            <p className="text-lg">{storeData.storeName}</p>
          </div>
          <div>
            <Label>Store Email</Label>
            <p className="text-lg">{storeData.storeEmail}</p>
          </div>
          <div>
            <Label>Store Mobile Number</Label>
            <p className="text-lg">{storeData.storeMobile}</p>
          </div>
          <div>
            <Label>Store Address</Label>
            <p className="text-lg whitespace-pre-wrap">{storeData.storeAddress}</p>
          </div>
          <div>
            <Label>Store Cover Picture</Label>
            {storeData.storeCoverPic ? (
              <div className="mt-2 w-full h-48 relative">
                <img 
                  src={URL.createObjectURL(storeData.storeCoverPic)}
                  alt="Store Cover" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ) : (
              <div className="mt-2 w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg">
                <Upload className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Contact Person Name</Label>
            <p className="text-lg">{storeData.contactName}</p>
          </div>
          <div>
            <Label>Contact Person Email</Label>
            <p className="text-lg">{storeData.contactEmail}</p>
          </div>
          <div>
            <Label>Contact Person Mobile Number</Label>
            <p className="text-lg">{storeData.contactMobile}</p>
          </div>
          <div>
            <Label>Contact Person Address</Label>
            <p className="text-lg whitespace-pre-wrap">{storeData.contactAddress}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ViewStore

