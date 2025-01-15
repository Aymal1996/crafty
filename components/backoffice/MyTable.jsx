'use client'

import * as React from 'react'
import { format, parseISO, isWithinInterval, startOfDay, endOfDay } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'

// Sample data for the table
const initialTableData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    product: 'Laptop',
    status: 'Delivered',
    customer_Status: 'Active',
    date: '2024-03-08'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    product: 'Smartphone',
    status: 'Pending',
    customer_Status: 'Active',
    date: '2024-03-07'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    product: 'Tablet',
    status: 'Processing',
    customer_Status: 'Inactive',
    date: '2024-03-06'
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    product: 'Smartwatch',
    status: 'Delivered',
    customer_Status: 'Active',
    date: '2024-03-05'
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    product: 'Headphones',
    status: 'Pending',
    customer_Status: 'Inactive',
    date: '2024-03-04'
  },
  {
    id: 6,
    name: 'Eva Martinez',
    email: 'eva@example.com',
    product: 'Speaker',
    status: 'Delivered',
    customer_Status: 'Active',
    date: '2024-03-03'
  },
  {
    id: 7,
    name: 'Frank Lee',
    email: 'frank@example.com',
    product: 'Camera',
    status: 'Processing',
    customer_Status: 'Active',
    date: '2024-03-02'
  },
  {
    id: 8,
    name: 'Grace Taylor',
    email: 'grace@example.com',
    product: 'Gaming Console',
    status: 'Pending',
    customer_Status: 'Inactive',
    date: '2024-03-01'
  },
  {
    id: 9,
    name: 'Henry Clark',
    email: 'henry@example.com',
    product: 'Printer',
    status: 'Delivered',
    customer_Status: 'Active',
    date: '2024-02-29'
  },
  {
    id: 10,
    name: 'Ivy Wong',
    email: 'ivy@example.com',
    product: 'Monitor',
    status: 'Processing',
    customer_Status: 'Active',
    date: '2024-02-28'
  },
  {
    id: 11,
    name: 'Jack Robinson',
    email: 'jack@example.com',
    product: 'Keyboard',
    status: 'Pending',
    customer_Status: 'Inactive',
    date: '2024-02-27'
  },
  {
    id: 12,
    name: 'Karen White',
    email: 'karen@example.com',
    product: 'Mouse',
    status: 'Delivered',
    customer_Status: 'Active',
    date: '2024-02-26'
  },
  {
    id: 13,
    name: 'Leo Garcia',
    email: 'leo@example.com',
    product: 'External Hard Drive',
    status: 'Processing',
    customer_Status: 'Active',
    date: '2024-02-25'
  },
  {
    id: 14,
    name: 'Mia Johnson',
    email: 'mia@example.com',
    product: 'Webcam',
    status: 'Pending',
    customer_Status: 'Inactive',
    date: '2024-02-24'
  },
  {
    id: 15,
    name: 'Nathan Brown',
    email: 'nathan@example.com',
    product: 'Microphone',
    status: 'Delivered',
    customer_Status: 'Active',
    date: '2024-02-23'
  },
  {
    id: 16,
    name: 'Olivia Davis',
    email: 'olivia@example.com',
    product: 'Router',
    status: 'Processing',
    customer_Status: 'Active',
    date: '2024-02-22'
  },
  {
    id: 17,
    name: 'Paul Miller',
    email: 'paul@example.com',
    product: 'Smartphone Case',
    status: 'Pending',
    customer_Status: 'Inactive',
    date: '2024-02-21'
  },
  {
    id: 18,
    name: 'Quinn Taylor',
    email: 'quinn@example.com',
    product: 'Laptop Bag',
    status: 'Delivered',
    customer_Status: 'Active',
    date: '2024-02-20'
  },
  {
    id: 19,
    name: 'Rachel Green',
    email: 'rachel@example.com',
    product: 'Wireless Earbuds',
    status: 'Processing',
    customer_Status: 'Active',
    date: '2024-02-19'
  },
  {
    id: 20,
    name: 'Sam Wilson',
    email: 'sam@example.com',
    product: 'Portable Charger',
    status: 'Pending',
    customer_Status: 'Inactive',
    date: '2024-02-18'
  },
  {
    id: 21,
    name: 'Tina Moore',
    email: 'tina@example.com',
    product: 'Fitness Tracker',
    status: 'Delivered',
    customer_Status: 'Active',
    date: '2024-02-17'
  },
  {
    id: 22,
    name: 'Ulysses King',
    email: 'ulysses@example.com',
    product: 'Smart Home Device',
    status: 'Processing',
    customer_Status: 'Active',
    date: '2024-02-16'
  },
  {
    id: 23,
    name: 'Victoria Adams',
    email: 'victoria@example.com',
    product: 'Gaming Mouse',
    status: 'Pending',
    customer_Status: 'Inactive',
    date: '2024-02-15'
  },
  {
    id: 24,
    name: 'William Lee',
    email: 'william@example.com',
    product: 'Desk Lamp',
    status: 'Delivered',
    customer_Status: 'Active',
    date: '2024-02-14'
  },
  {
    id: 25,
    name: 'Xena Campbell',
    email: 'xena@example.com',
    product: 'Bluetooth Speaker',
    status: 'Processing',
    customer_Status: 'Active',
    date: '2024-02-13'
  }
]

function DatePickerWithRange({ className, value, onChange }) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal h-[50px] dark:bg-gray-900',
              !value && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, 'dd-MM-yyyy')} - {format(value.to, 'dd-MM-yyyy')}
                </>
              ) : (
                format(value.from, 'dd-MM-yyyy')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function MyTable({
  customerStatus = true,
  filter = true,
  title = 'Recent Orders',
  description = 'A list of recent orders with their details',
  searchPlaceholder = 'Search orders...',
  Orderproducts = true
}) {
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = React.useState(1)
  const [inputPage, setInputPage] = React.useState('1')
  const [tableData, setTableData] = React.useState(initialTableData)
  const [statusFilter, setStatusFilter] = React.useState('All')
  const [searchTerm, setSearchTerm] = React.useState('')
  const [dateRange, setDateRange] = React.useState({
    from: undefined,
    to: undefined
  })

  const resetFilters = () => {
    setStatusFilter('All')
    setSearchTerm('')
    setDateRange({ from: undefined, to: undefined })
    setCurrentPage(1)
    setInputPage('1')
  }

  const filteredData = React.useMemo(() => {
    return tableData.filter(order => {
      const orderDate = parseISO(order.date)
      const dateInRange =
        (!dateRange.from && !dateRange.to) ||
        (dateRange.from && dateRange.to && isWithinInterval(orderDate, {
          start: startOfDay(dateRange.from),
          end: endOfDay(dateRange.to)
        }))

      const statusMatch =
        statusFilter === 'All' ||
        (customerStatus
          ? order.customer_Status === statusFilter
          : order.status === statusFilter)

      const searchMatch =
        searchTerm === '' ||
        order.id.toString().includes(searchTerm) ||
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.product.toLowerCase().includes(searchTerm.toLowerCase())

      return dateInRange && statusMatch && searchMatch
    })
  }, [tableData, statusFilter, searchTerm, dateRange, customerStatus])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const goToNextPage = () => {
    setCurrentPage(page => Math.min(page + 1, totalPages))
    setInputPage(page => Math.min(parseInt(page) + 1, totalPages).toString())
  }

  const goToPreviousPage = () => {
    setCurrentPage(page => Math.max(page - 1, 1))
    setInputPage(page => Math.max(parseInt(page) - 1, 1).toString())
  }

  const handlePageInputChange = (e) => {
    setInputPage(e.target.value)
  }

  const handlePageInputBlur = () => {
    const pageNumber = parseInt(inputPage)
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    } else {
      setInputPage(currentPage.toString())
    }
  }

  const handlePageInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      handlePageInputBlur()
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-yellow-500'
      case 'Processing':
        return 'text-blue-500'
      case 'Delivered':
        return 'text-green-500'
      case 'Active':
        return 'text-green-500'
      case 'Inactive':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const handleStatusChange = (orderId, newStatus) => {
    setTableData(prevData =>
      prevData.map(order =>
        order.id === orderId
          ? customerStatus
            ? { ...order, customer_Status: newStatus }
            : { ...order, status: newStatus }
          : order
      )
    )
  }

  return (
    <Card className="border-2 dark:bg-gray-800">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {filter && (
        <CardContent>
          <div className="flex flex-nowrap gap-3 mb-4">
            <div className="flex flex-col w-[100%]">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="mt-2 h-[50px] dark:bg-gray-900"
              />
            </div>

            <div className="flex flex-col w-[70%]">
              <Label htmlFor="status-filter" className="">
                Status
              </Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger
                  id="status-filter"
                  className="mt-2 h-[50px] dark:bg-gray-900"
                >
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Statuses</SelectItem>
                  {customerStatus ? (
                    <>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col w-[70%]]">
              <Label htmlFor="date-range">Date Range</Label>
              <DatePickerWithRange
                className="mt-2"
                value={dateRange}
                onChange={setDateRange}
              />
            </div>

            <div className="flex flex-col justify-end  w-[70%]">
              <Button
                onClick={resetFilters}
                variant="outline"
                className="h-[50px] dark:bg-black  w-[50%]"
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </CardContent>
      )}
      <CardContent>
        <Table>
          <TableCaption>
            List of orders as of {format(new Date(), 'dd-MM-yyyy')}
          </TableCaption>
          <TableHeader>
            <TableRow className="border-gray-500 border-2">
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead className="border-gray-500 border-2">
                Customer Name
              </TableHead>
              <TableHead className="border-gray-500 border-2">Email</TableHead>
              {Orderproducts && (
                <TableHead className="border-gray-500 border-2">
                  Product
                </TableHead>
              )}
              <TableHead className="border-gray-500 border-2">Date</TableHead>
              <TableHead className="border-gray-500 border-2 text-center">
                Status
              </TableHead>
              <TableHead className="text-center border-gray-500 border-2">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border-gray-500 border-2">
            {currentData.map(order => (
              <TableRow key={order.id} className="border-gray-500 border-2">
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell className="border-gray-500 border-2">
                  {order.name}
                </TableCell>
                <TableCell className="border-gray-500 border-2">
                  {order.email}
                </TableCell>
                {Orderproducts && (
                  <TableCell className="border-gray-500 border-2">
                    {order.product}
                  </TableCell>
                )}
                <TableCell className="border-gray-500 border-2">
                  {format(parseISO(order.date), 'dd-MM-yyyy')}
                </TableCell>
                <TableCell className="border-gray-500 border-1 text-center flex justify-center">
                  <Select
                    value={customerStatus ? order.customer_Status : order.status}
                    onValueChange={value => handleStatusChange(order.id, value)}
                  >
                    <SelectTrigger
                      className={`dark:bg-gray-900 w-[130px] ${getStatusColor(
                        customerStatus ? order.customer_Status : order.status
                      )}`}
                    >
                      <SelectValue placeholder={customerStatus ? order.customer_Status : order.status} />
                    </SelectTrigger>
                    <SelectContent>
                      {customerStatus ? (
                        <>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Processing">Processing</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-center border-gray-500 border-2">
                  <Button
                    className="dark:bg-gray-900"
                    variant="outline"
                    size="sm"
                    onClick={() => alert(`View details for Order #${order.id}`)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {totalPages > 1 && (
        <CardFooter className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="dark:bg-gray-900"
          >
            Previous
          </Button>
          <div className="flex items-center">
            <span className="mr-2">Page</span>
            <Input
              type="text"
              value={inputPage}
              onChange={handlePageInputChange}
              onBlur={handlePageInputBlur}
              onKeyDown={handlePageInputKeyDown}
              className="w-12 text-center dark:bg-gray-900"
              aria-label="Current page"
            />
            <span className="ml-2">of {totalPages}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="dark:bg-gray-900"
          >
            Next
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

