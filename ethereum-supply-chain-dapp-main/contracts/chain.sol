pragma solidity >=0.4.21 <0.7.0;
contract Manufacturer {
    address creator;
    struct product
    {
        address _manufacturer;
        address[] _distributor;
        address _retailer;
        address _owner;
        string _desc;
        uint pr;
        uint price;
        uint no_of_distributor;
    }
    struct transactions
    {
        address from;
        address to;
        uint[] pr_id;
        uint amount;
        uint timestamp;
    }

    product[] public all_products;
    mapping (address => transactions[]) public all_transactions;
    //mapping (address => product[]) public manufacturerProducts1;
    uint product_num;

    constructor() public 
    {
        product_num = 0;
    }
    
    function manufacturerCreatesProduct(
        address _manufacturerAddr,
        string memory _description,
        uint _quantity,
        uint cost
        ) public {
        require(_manufacturerAddr == msg.sender);
        for(uint i=0 ; i<_quantity ; i++)
        {
            product memory Product1 = product(_manufacturerAddr ,new address[](10),address(0),_manufacturerAddr, _description , ++product_num,cost , 0);
            all_products.push(Product1);
            //manufacturerProducts1[_manufacturerAddr].push(product(_manufacturerAddr ,address(0),address(0),_manufacturerAddr, _description , ++product_num,cost));
        }        
    }

    function ownerToDistributor(
        address _ownerAddr,
        address _distributorAddr,
        uint[] memory pr_id,
        uint cost
    ) public {
        for(uint i=0; i<pr_id.length; i++)
        {
            // Product with this pr_id should exist and its ownership must be with _manfactureraddr
            require(pr_id[i] <= product_num);
            require(all_products[pr_id[i]]._owner == _ownerAddr);

            all_products[pr_id[i]]._distributor[all_products[pr_id[i]].no_of_distributor++] = _distributorAddr;
            all_products[pr_id[i]]._owner = _distributorAddr;
        }
        
        handletransactions(_ownerAddr, _distributorAddr, pr_id, cost);
    }

    function distributorToRetailer(
        address _distributorAddr,
        address _retailerAddr,
        uint[] memory pr_id,
        uint cost
    ) public {

        for(uint i=0; i<pr_id.length; i++)
        {
            // checking that product exists and dis
            require(pr_id[i] <= product_num);
            require(all_products[pr_id[i]]._owner == _distributorAddr);

            all_products[pr_id[i]]._retailer = _retailerAddr;
            all_products[pr_id[i]]._owner = _retailerAddr;
        }
        
        handletransactions(_distributorAddr, _retailerAddr, pr_id, cost);
    }


    function handletransactions
    (
        address from ,
         address to , 
         uint[] memory product_ids ,
         uint amount 
    )
    public
    {
        uint timestamp = now;
        all_transactions[from].push(transactions(from , to , product_ids , amount , timestamp));
        all_transactions[to].push(transactions(from , to , product_ids , amount , timestamp));
    }

}