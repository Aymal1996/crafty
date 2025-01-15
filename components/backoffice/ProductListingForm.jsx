"use client"
import React, { useState, useEffect } from "react";
import { Info, Pencil, X, Upload, ArrowUpRight, Search, ChevronRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

// Updated categories data structure
const categories = [
  {
    id: 1,
    name: "Jewelry",
    subcategories: [
      {
        id: 11,
        name: "Rings",
        subcategories: [
          { id: 110, name: "Statement Rings", value: "statement-rings" },
          { id: 112, name: "Wedding Rings", value: "wedding-rings" },
        ]
      },
      {
        id: 12,
        name: "Earrings",
        subcategories: [
          { id: 121, name: "Stud Earrings", value: "stud-earrings" },
          { id: 122, name: "Hoop Earrings", value: "hoop-earrings" },
        ]
      },
      {
        id: 13,
        name: "Necklaces",
        subcategories: [
          { id: 131, name: "Pendants", value: "pendants" },
          { id: 132, name: "Chains", value: "chains" },
        ]
      },
    ]
  },
  {
    id: 2,
    name: "Clothing",
    subcategories: [
      {
        id: 21,
        name: "Tops",
        subcategories: [
          { id: 211, name: "T-Shirts", value: "t-shirts" },
          { id: 212, name: "Blouses", value: "blouses" },
        ]
      },
      {
        id: 22,
        name: "Bottoms",
        subcategories: [
          { id: 221, name: "Jeans", value: "jeans" },
          { id: 222, name: "Skirts", value: "skirts" },
        ]
      },
      {
        id: 23,
        name: "Dresses",
        subcategories: [
          { id: 231, name: "Maxi Dresses", value: "maxi-dresses" },
          { id: 232, name: "Cocktail Dresses", value: "cocktail-dresses" },
        ]
      },
    ]
  },
  {
    id: 3,
    name: "Home & Living",
    subcategories: [
      {
        id: 31,
        name: "Decor",
        subcategories: [
          { id: 311, name: "Wall Art", value: "wall-art" },
          { id: 312, name: "Vases", value: "vases" },
        ]
      },
      {
        id: 32,
        name: "Furniture",
        subcategories: [
          { id: 321, name: "Chairs", value: "chairs" },
          { id: 322, name: "Tables", value: "tables" },
        ]
      },
    ]
  },
];

const ProductListingForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState(Array(10).fill(null));
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [error, setError] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isThumbnailModalOpen, setIsThumbnailModalOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [sku, setSku] = useState("");
  const [isDomesticPricing, setIsDomesticPricing] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});
  const { toast } = useToast();

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const renderCategories = (categories) => {
    return categories.map(category => (
      <CommandItem
        key={category.id}
        value={category.name}
        onSelect={() => {
          setSelectedCategory(category);
          setCategoryOpen(false);
        }}
      >
        {category.name}
      </CommandItem>
    ));
  };

  const flattenCategories = (categories, parentName = '') => {
    return categories.reduce((acc, category) => {
      const fullName = parentName ? `${parentName} > ${category.name}` : category.name;
      acc.push({ ...category, fullName });
      if (category.subcategories) {
        acc.push(...flattenCategories(category.subcategories, fullName));
      }
      return acc;
    }, []);
  };

  const filteredCategories = flattenCategories(categories).filter(category =>
    category.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isVideo = (file) => file && file.type.startsWith('video/');
  const isImage = (file) => file && file.type.startsWith('image/');

  const validateFiles = (newFiles) => {
    const videos = newFiles.filter(file => isVideo(file));
    const images = newFiles.filter(file => isImage(file));

    if (videos.length > 1) {
      return "Only 1 video is allowed";
    }

    if (images.length < 9) {
      return "Please upload at least 9 photos and 1 video";
    }

    return "";
  };

  const handleFileUpload = (e, index) => {
    e.preventDefault();
    const uploadedFile = e.target.files[0];
    
    if (!uploadedFile) return;

    const newFile = Object.assign(uploadedFile, {
      preview: URL.createObjectURL(uploadedFile)
    });

    const newFiles = [...files];
    newFiles[index] = newFile;

    // Set first image as thumbnail by default if no thumbnail is set
    if (!thumbnailFile && isImage(newFile)) {
      setThumbnailFile(newFile);
    }

    setFiles(newFiles);
    setError("");
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file && isImage(file)) {
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file)
      });
      setThumbnailFile(newFile);
    }
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    if (thumbnailFile === files[index]) {
      setThumbnailFile(null);
    }
    newFiles[index] = null;
    setFiles(newFiles);
    const validationError = validateFiles(newFiles);
    setError(validationError);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateFiles(files);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    if (!price || parseFloat(price) <= 0) {
      setError("Price must be a positive number");
      return;
    }

    // Add your form submission logic here
    console.log("Form submitted successfully");
  };

  const handleCancel = () => {
    toast({
      title: "Changes discarded",
      description: "Your changes have been discarded.",
    });
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft saved",
      description: "Your listing has been saved as a draft.",
    });
  };

  const handlePublish = () => {
    toast({
      title: "Listing published",
      description: "Your listing is now live and visible to buyers.",
    });
  };

  useEffect(() => {
    return () => {
      files.forEach(file => file && URL.revokeObjectURL(file.preview));
      thumbnailFile && URL.revokeObjectURL(thumbnailFile.preview);
    };
  }, [files, thumbnailFile]);

  return (
    <div className="space-y-6">
      <Toaster />
      <Card className="w-full mx-auto dark:bg-gray-800">
        <CardContent className="space-y-6 pt-5 max-w-5xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Title Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="title" className="text-base font-medium">
                    Title
                  </Label>
                  <span className="text-red-500">*</span>
                </div>
                <div className="space-y-2">
                  <Input
                    id="title"
                    placeholder="Include keywords that buyers would use to search for this item."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={140}
                    className="h-12 bg-gray-700"
                  />
                  <div className="text-right text-sm text-muted-foreground">
                    {title.length}/80
                  </div>
                </div>
              </div>

              {/* Photos Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label className="text-base font-medium">Photos and video</Label>
                    <span className="text-red-500">*</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Add at least 9 photos. You can optionally add 1 video.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Pencil className="h-4 w-4" />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Edit Photos and Video</DialogTitle>
                        <DialogDescription>
                          Manage your uploaded files here. Click on an empty slot to add a new file.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="relative aspect-square overflow-hidden rounded-lg border bg-muted"
                          >
                            {file ? (
                              <>
                                {isVideo(file) ? (
                                  <video
                                    src={file.preview}
                                    className="h-full w-full object-cover"
                                    controls
                                  />
                                ) : (
                                  <img
                                    src={file.preview}
                                    alt={`Upload ${index + 1}`}
                                    className="h-full w-full object-cover"
                                  />
                                )}
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-1 right-1 h-6 w-6"
                                  onClick={() => removeFile(index)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <label className="flex items-center justify-center w-full h-full cursor-pointer">
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={(e) => handleFileUpload(e, index)}
                                  accept="image/*,video/*"
                                />
                                <Upload className="h-6 w-6 text-muted-foreground" />
                              </label>
                            )}
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="relative aspect-square overflow-hidden rounded-lg border bg-gray-700"
                    >
                      {file ? (
                        <>
                          {isVideo(file) ? (
                            <video
                              src={file.preview}
                              className="h-full w-full object-cover"
                              controls
                            />
                          ) : (
                            <img
                              src={file.preview}
                              alt={`Upload ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </>
                      ) : (
                        <label className="flex items-center justify-center w-full h-full cursor-pointer">
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, index)}
                            accept="image/*,video/*"
                          />
                          <Upload className="h-6 w-6 text-muted-foreground" />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Thumbnail Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium">Thumbnail</h3>
                    <p className="text-sm text-muted-foreground pr-20">
                      The thumbnail is a cropped version of your primary photo. It's what buyers see in search results. This image will be used as your listing's thumbnail in search results and recommendations.
                      Select any of your listing photos as the thumbnail or upload a new one.
                    </p>
                  </div>
                  <Dialog open={isThumbnailModalOpen} onOpenChange={setIsThumbnailModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <ArrowUpRight className="h-4 w-4" />
                        Adjust thumbnail
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Select Thumbnail</DialogTitle>
                        <DialogDescription>
                          Choose which image to use as your thumbnail
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-4 gap-4">
                        {files.map((file, index) => (
                          file && isImage(file) && (
                            <div
                              key={index}
                              className={`relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 ${
                                thumbnailFile === file ? 'border-primary' : 'border-muted'
                              }`}
                              onClick={() => {
                                setThumbnailFile(file);
                                setIsThumbnailModalOpen(false);
                              }}
                            >
                              <img
                                src={file.preview}
                                alt={`Thumbnail option ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="relative">
                    <div className="aspect-square w-32 overflow-hidden rounded-lg border bg-gray-700 flex items-center justify-center">
                      {thumbnailFile ? (
                        <img
                          src={thumbnailFile.preview}
                          alt="Selected thumbnail"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                          <Upload className="h-6 w-6 mb-2" />
                          <span className="text-xs text-center">
                            No thumbnail selected
                          </span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      id="thumbnail-upload"
                      className="hidden"
                      onChange={handleThumbnailUpload}
                      accept="image/*"
                    />
                    {thumbnailFile && (
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => setThumbnailFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById('thumbnail-upload').click()}
                    >
                      Upload new thumbnail
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Or select from your uploaded photos
                    </p>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="description" className="text-base font-medium">
                    Instructions For Buyers
                  </Label>
                  <span className="text-red-500">*</span>
                </div>
                <p className="text-sm text-muted-foreground">
                    Enter the personalization instructions you want buyers to see.
                </p>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px] dark:bg-gray-700"
                />
                <div className="text-right text-sm text-muted-foreground">
                  {description.length}/500
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Price & Inventory Card */}
      <Card className="w-full mx-auto dark:bg-gray-800">
        <CardHeader className="space-y-6 pt-5 max-w-5xl mx-auto">
          <CardTitle>Price & Inventory</CardTitle>
          <CardDescription>Set a price for your item and indicate how many are available for sale.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-5 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                {/* <Label className="text-base font-medium">Domestic and global pricing</Label>
                <p className="text-sm text-muted-foreground">
                  Set different prices for buyers in Australia and everywhere else
                </p> */}
              </div>
              <Switch
                checked={isDomesticPricing}
                onCheckedChange={setIsDomesticPricing}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="price" className="text-sm font-medium">
                    Price
                  </Label>
                  <span className="text-red-500">*</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    AED
                  </span>
                  <Input
                    id="price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="pl-12 bg-gray-700"
                    min="0"
                    step="0.01"
                  />
                </div>
                {parseFloat(price) <= 0 && (
                  <p className="text-sm text-destructive">
                    Price must be a positive number.
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="quantity" className="text-sm font-medium">
                    Quantity
                  </Label>
                  <span className="text-red-500">*</span>
                </div>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  className="bg-gray-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku" className="text-sm font-medium">
                  SKU
                </Label>
                <Input
                  id="sku"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  maxLength={32}
                  className="bg-gray-700"
                />
                <div className="text-right text-xs text-muted-foreground">
                  {sku.length}/32
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Card */}
      <Card className="w-full mx-auto dark:bg-gray-800">
        <CardHeader className="space-y-6 pt-5 max-w-5xl mx-auto">
          <CardTitle>Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-5 max-w-5xl mx-auto">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-base font-medium">
                Category
              </Label>
              <span className="text-red-500">*</span>
            </div>
            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={categoryOpen}
                  className="w-full justify-between h-12 bg-gray-700"
                >
                  {selectedCategory ? (
                    <div className="flex items-center gap-2 text-left">
                      {selectedCategory.fullName || selectedCategory.name}
                    </div>
                  ) : (
                    "Search for a category, e.g. Jewelry, Clothing, Home & Living"
                  )}
                  <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput 
                    placeholder="Search categories..." 
                    value={searchTerm}
                    onValueChange={setSearchTerm}
                  />
                  <CommandEmpty>No category found.</CommandEmpty>
                  <CommandGroup>
                    {searchTerm
                      ? renderCategories(filteredCategories )
                      : renderCategories(categories)}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedCategory && (
              <p className="text-sm text-muted-foreground">
                This listing will appear in the {selectedCategory.name} category.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Footer Card */}
      <Card className="w-full mx-auto border-0 bg-transparent p-0">
        <CardFooter className="flex justify-end gap-4 p-0">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleSaveDraft}>
            Save as draft
          </Button>
          <Button onClick={handlePublish} className="dark:bg-green-700 dark:text-white">
            Publish
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductListingForm;

