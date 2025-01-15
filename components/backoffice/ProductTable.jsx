'use client'

import * as React from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ArrowUpDown, Import, Upload, PenSquare, Trash2, ZoomIn, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import Heading from '@/components/backoffice/Heading'
import { ProductDetailModal } from './ProductDetailModal'
import Link from 'next/link'
import chip from '@/public/chip.jpeg'

// Mock data for products
const products = [
  { 
    id: 1, 
    name: "Premium T-Shirt", 
    image: chip,
    category: "Men", 
    price: 450.00, 
    salePrice: 450.00, 
    stock: 4972, 
    status: "Selling", 
    published: true 
  },
  { 
    id: 2, 
    name: "Himalaya Powder", 
    image: chip,
    category: "Skin Care", 
    price: 174.97, 
    salePrice: 160.00, 
    stock: 5472, 
    status: "Selling", 
    published: true 
  },
  { 
    id: 3, 
    name: "Green Leaf Lettuce", 
    image: chip,
    category: "Fresh Vegetable", 
    price: 112.72, 
    salePrice: 112.72, 
    stock: 463, 
    status: "Selling", 
    published: true 
  },
  { 
    id: 4, 
    name: "Rainbow Chard", 
    image: chip,
    category: "Fresh Vegetable", 
    price: 7.07, 
    salePrice: 7.07, 
    stock: 472, 
    status: "Selling", 
    published: true 
  },
]

export function ProductTable() {
  const router = useRouter()
  const [selectedProducts, setSelectedProducts] = React.useState([])
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('all')
  const [selectedPrice, setSelectedPrice] = React.useState('no-sort')
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [productToDelete, setProductToDelete] = React.useState(null)
  const [filteredProducts, setFilteredProducts] = React.useState(products)
  const [currentPage, setCurrentPage] = React.useState(1)
  const productsPerPage = 10
  // const [showProductDetailModal, setShowProductDetailModal] = React.useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = React.useState(null);
  const [showProductAddModal, setShowProductAddModal] = React.useState(false);


  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map(p => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId, checked) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, productId])
    } else {
      setSelectedProducts(selectedProducts.filter(id => id !== productId))
    }
  }

  const handlePublishToggle = (productId) => {
    const updatedProducts = filteredProducts.map(product => 
      product.id === productId 
        ? { ...product, published: !product.published }
        : product
    )
    setFilteredProducts(updatedProducts)
    toast.success("Publication status updated successfully")
  }

  const handleExport = () => {
    const selectedData = filteredProducts.filter(product => selectedProducts.includes(product.id))
    const csv = convertToCSV(selectedData)
    downloadCSV(csv, 'products-export.csv')
    toast.success("Export started")
  }

  const handleImport = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Here you would typically handle file upload and processing
      toast.success("Import started")
    }
  }

  // const handleAddProduct = () => {
  //   setShowProductAddModal(true);
  // }

  const handleEditProduct = (productId) => {
    router.push(`/dashboard/products/edit/${productId}`)
  }

  const handleViewProduct = (productId) => {
    const product = filteredProducts.find(p => p.id === productId);
    setSelectedProductForModal(product);
    // setShowProductDetailModal(true);
  }

  const handleDeleteProduct = (productId) => {
    setProductToDelete(productId)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (productToDelete) {
      const updatedProducts = filteredProducts.filter(product => product.id !== productToDelete)
      setFilteredProducts(updatedProducts)
      setShowDeleteDialog(false)
      setProductToDelete(null)
      toast.success("Product deleted successfully")
    }
  }

  const handleBulkDelete = () => {
    if (selectedProducts.length > 0) {
      const updatedProducts = filteredProducts.filter(product => !selectedProducts.includes(product.id))
      setFilteredProducts(updatedProducts)
      setSelectedProducts([])
      toast.success(`${selectedProducts.length} products deleted successfully`)
    }
  }

  const handleFilter = React.useCallback(() => {
    let filtered = [...products]

    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    if (selectedPrice && selectedPrice !== 'no-sort') {
      filtered = filtered.sort((a, b) => {
        if (selectedPrice === 'low-to-high') {
          return a.price - b.price
        } else {
          return b.price - a.price
        }
      })
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [searchTerm, selectedCategory, selectedPrice])

  React.useEffect(() => {
    handleFilter()
  }, [handleFilter])

  const handleReset = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedPrice('no-sort')
    setFilteredProducts(products)
    setCurrentPage(1)
    toast.success("Filters reset")
  }

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(obj => Object.values(obj).join(','))
    return [headers, ...rows].join('\n')
  }

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleAddNewProduct = (newProduct) => {
    setFilteredProducts(prevProducts => [...prevProducts, newProduct]);
    toast.success("Product added successfully");
  }

  return (
    <div className="mt-10 p-6 space-y-6 bg-gray-800 text-white min-h-screen rounded-[10px]">
      <div className="flex justify-between items-center">
      <Heading title="Product Detail" />
      </div>

      <div className="flex justify-end items-center">
        
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            className="bg-black h-[50px]" 
            disabled={selectedProducts.length === 0}
            onClick={() => setShowDeleteDialog(true)}
          >
            Bulk Action
          </Button>
          <Button 
            variant="destructive" 
            disabled={selectedProducts.length === 0}
            onClick={handleBulkDelete}
            className="h-[50px]"
          >
            Delete
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 h-[50px] font-Vietnam font-semibold text-1xl">
            <Link className='flex' href="/dashboard/products/add-new-product"><Plus className="mr-2 h-4 w-4" /> Add Product</Link>
          </Button>
        </div>
      </div>

      <div className="flex space-x-4">
        <Input 
          placeholder="Search Product" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm bg-slate-900 border-slate-800 h-[50px] w-full"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[280px] bg-slate-900 border-slate-800 h-[50px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Men">Men</SelectItem>
            <SelectItem value="Skin Care">Skin Care</SelectItem>
            <SelectItem value="Fresh Vegetable">Fresh Vegetable</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedPrice} onValueChange={setSelectedPrice}>
          <SelectTrigger className="w-[280px] bg-slate-900 border-slate-800 h-[50px]">
            <SelectValue placeholder="Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no-sort">No Sorting</SelectItem>
            <SelectItem value="low-to-high">Low to High</SelectItem>
            <SelectItem value="high-to-low">High to Low</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="text-white h-[50px] w-[160px]" onClick={handleReset}>
          Reset
        </Button>
      </div>

      <div className="rounded-md border border-slate-800">
        <Table>
          <TableHeader className="bg-slate-800 border-gray-500 border-2">
            <TableRow className="border-slate-800 ">
              <TableHead className="w-[50px] ">
                <Checkbox 
                  className="w-3 h-3"
                  checked={selectedProducts.length === currentProducts.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="text-gray-400 border-gray-500 border-2">PRODUCT NAME</TableHead>
              <TableHead className="text-gray-400 border-gray-500 border-2">CATEGORY</TableHead>
              <TableHead className="text-gray-400 border-gray-500 border-2">PRICE</TableHead>
              <TableHead className="text-gray-400 border-gray-500 border-2">SALE PRICE</TableHead>
              <TableHead className="text-gray-400 border-gray-500 border-2">STOCK</TableHead>
              <TableHead className="text-gray-400 border-gray-500 border-2">STATUS</TableHead>
              <TableHead className="text-gray-400 border-gray-500 border-2">VIEW</TableHead>
              <TableHead className="text-gray-400 border-gray-500 border-2">PUBLISHED</TableHead>
              <TableHead className="text-gray-400 border-gray-500 border-2">ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-gray-500 border-2">
            {currentProducts.map((product) => (
              <TableRow key={product.id} className="border-gray-500 ">
                <TableCell className="border-gray-500 border-2">
                  <Checkbox 
                    checked={selectedProducts.includes(product.id)}
                    className="w-3 h-3"
                    onCheckedChange={(checked) => handleSelectProduct(product.id, checked)}
                  />
                </TableCell>
                <TableCell className="font-medium flex items-center gap-2 ">
                  <div className="w-8 h-8 rounded bg-slate-800 overflow-hidden">
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  {product.name}
                </TableCell>
                <TableCell className="border-gray-500 border-2">{product.category}</TableCell>
                <TableCell className="border-gray-500 border-2">${product.price.toFixed(2)}</TableCell>
                <TableCell className="border-gray-500 border-2">${product.salePrice.toFixed(2)}</TableCell>
                <TableCell className="border-gray-500 border-2">{product.stock}</TableCell>
                <TableCell className="border-gray-500 border-2">
                  <Badge className="bg-emerald-600 hover:bg-emerald-700">
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell className="border-gray-500 border-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="hover:bg-slate-800"
                    onClick={() => handleViewProduct(product.id)}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className="border-gray-500 border-2 text-center">
                  <Switch
                    className="scale-75"
                    checked={product.published}
                    onCheckedChange={() => handlePublishToggle(product.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover:bg-slate-800"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="hover:bg-slate-800"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-slate-900 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to delete {selectedProducts.length > 0 ? 'these products' : 'this product'}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={selectedProducts.length > 0 ? handleBulkDelete : confirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ProductDetailModal 
        open={selectedProducts} 
        onOpenChange={true} 
        product={selectedProductForModal} 
      />
    </div>
  )
}

